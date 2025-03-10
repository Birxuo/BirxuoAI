
interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface CompletionRequest {
  messages: Message[];
  model: string;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
  apiKey: string;
  tools?: any[];
}

interface CompletionResponse {
  choices: {
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
  }[];
  id: string;
  model: string;
  created: number;
}

export interface AIError {
  message: string;
  type: 'api_key' | 'rate_limit' | 'model_unavailable' | 'network' | 'unknown';
}

// Tool definitions for web search
const webSearchTool = {
  type: "function",
  function: {
    name: "web_search",
    description: "Search the web for information on a topic",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "The search query to use"
        }
      },
      required: ["query"]
    }
  }
};

// Simple web search function using DuckDuckGo
async function performWebSearch(query: string) {
  try {
    const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`);
    if (!response.ok) {
      throw new Error('Search failed');
    }
    const data = await response.json();
    return data.AbstractText || 'No search results found.';
  } catch (error) {
    console.error('Search error:', error);
    return 'Error performing web search.';
  }
}

export const fetchCompletion = async (
  messages: Message[],
  apiKey: string,
  webSearchEnabled: boolean = false
): Promise<string | AIError> => {
  try {
    console.log('Sending request to OpenRouter API');
    
    // Create the request body
    const requestBody: any = {
      model: 'deepseek/deepseek-r1-distill-llama-70b',
      messages: messages,
      temperature: 0.5,
      max_tokens: 2048
    };
    
    // Add tools for web search if enabled
    if (webSearchEnabled) {
      requestBody.tools = [webSearchTool];
      requestBody.tool_choice = "auto";
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'BIRXUO AI Assistant'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      // Handle different error status codes
      const errorData = await response.json().catch(() => ({}));
      console.error('API error:', errorData);

      if (response.status === 401) {
        return {
          message: 'Invalid API key. Please check your OpenRouter API key.',
          type: 'api_key'
        };
      } else if (response.status === 429) {
        return {
          message: 'Rate limit exceeded. Please try again later.',
          type: 'rate_limit'
        };
      } else if (response.status === 404) {
        return {
          message: 'The requested model is currently unavailable.',
          type: 'model_unavailable'
        };
      } else {
        return {
          message: `Error: ${errorData.error?.message || response.statusText}`,
          type: 'unknown'
        };
      }
    }

    const data: CompletionResponse = await response.json();
    
    // Check if the response includes a tool call for web search
    if (webSearchEnabled && 
        data.choices[0].message.content && 
        data.choices[0].message.content.includes('web_search')) {
      
      // Extract query from the tool call (this is a simplified approach)
      const contentText = data.choices[0].message.content;
      const queryMatch = contentText.match(/query["']:\s*["']([^"']+)["']/);
      
      if (queryMatch && queryMatch[1]) {
        const searchQuery = queryMatch[1];
        const searchResults = await performWebSearch(searchQuery);
        
        // Add search results to the messages and make another API call
        const newMessages = [
          ...messages,
          { role: 'assistant' as const, content: contentText },
          { 
            role: 'user' as const, 
            content: `Search results for "${searchQuery}": ${searchResults}. Please summarize this information.`
          }
        ];
        
        return fetchCompletion(newMessages, apiKey, false); // Avoid recursive search
      }
    }
    
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Network error:', error);
    return {
      message: 'Network error. Please check your connection and try again.',
      type: 'network'
    };
  }
};

// Utility function to check if a value is an AIError
export const isAIError = (value: any): value is AIError => {
  return value && typeof value === 'object' && 'type' in value && 'message' in value;
};

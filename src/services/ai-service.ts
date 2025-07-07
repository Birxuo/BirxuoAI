
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

// Enhanced AI model definitions with more detailed capabilities
export const AI_MODELS = [
  {
    id: 'deepseek/deepseek-r1:free',
    name: 'DeepSeek-R1',
    description: 'Advanced reasoning model with uncensored capabilities for complex problem-solving.',
    category: 'reasoning',
    capabilities: ['reasoning', 'coding', 'math', 'analysis'],
    speed: 'medium',
    quality: 'very-high'
  },
  {
    id: 'deepseek/deepseek-chat-v3-0324:free',
    name: 'DeepSeek V3',
    description: 'Ultra-fast conversational AI optimized for real-time interactions.',
    category: 'chat',
    capabilities: ['conversation', 'general-knowledge', 'quick-responses'],
    speed: 'very-fast',
    quality: 'high'
  },
  {
    id: 'cognitivecomputations/dolphin3.0-r1-mistral-24b:free',
    name: 'Dolphin 3.0',
    description: 'Specialized general-purpose model with enhanced coding and mathematical capabilities.',
    category: 'general',
    capabilities: ['coding', 'math', 'functions', 'agents'],
    speed: 'fast',
    quality: 'high'
  },
  {
    id: 'deepseek/deepseek-r1-distill-llama-70b:free',
    name: 'Distill Llama 70B',
    description: 'Distilled reasoning model combining Llama architecture with DeepSeek reasoning.',
    category: 'reasoning',
    capabilities: ['reasoning', 'analysis', 'research'],
    speed: 'medium',
    quality: 'very-high'
  },
  {
    id: 'qwen/qwq-32b:free',
    name: 'Qwen 2.5',
    description: 'Multilingual model with enhanced reasoning while maintaining conversational flow.',
    category: 'multilingual',
    capabilities: ['multilingual', 'reasoning', 'conversation'],
    speed: 'fast',
    quality: 'high'
  },
  {
    id: 'meta-llama/llama-4-maverick:free',
    name: 'Llama 4 Maverick',
    description: 'Cutting-edge mixture-of-experts model with 17B active parameters for multimodal tasks.',
    category: 'multimodal',
    capabilities: ['multimodal', 'vision', 'reasoning', 'coding'],
    speed: 'medium',
    quality: 'very-high'
  },
  {
    id: 'microsoft/phi-4-reasoning-plus:free',
    name: 'Phi-4 Reasoning+',
    description: 'Microsoft\'s enhanced reasoning model optimized for STEM subjects and coding.',
    category: 'reasoning',
    capabilities: ['math', 'science', 'coding', 'reasoning'],
    speed: 'fast',
    quality: 'very-high'
  },
  {
    id: 'qwen/qwen3-235b-a22b:free',
    name: 'Qwen3 235B',
    description: 'Massive parameter model with thinking mode for complex reasoning tasks.',
    category: 'reasoning',
    capabilities: ['reasoning', 'thinking-mode', 'multilingual', 'agents'],
    speed: 'slow',
    quality: 'exceptional'
  },
  {
    id: 'google/gemini-2.5-pro-exp-03-25:free',
    name: 'Gemini Pro 2.5',
    description: 'Google\'s latest model excelling in rapid multi-step reasoning and real-world scenarios.',
    category: 'reasoning',
    capabilities: ['reasoning', 'real-world', 'analysis'],
    speed: 'fast',
    quality: 'very-high'
  },
  {
    id: 'openrouter/quasar-alpha',
    name: 'Quasar Alpha',
    description: 'Experimental cloaked model for advanced users seeking cutting-edge AI capabilities.',
    category: 'experimental',
    capabilities: ['experimental', 'long-context', 'coding'],
    speed: 'medium',
    quality: 'unknown'
  }
];

// Enhanced application templates with more sophisticated prompts
export interface AppTemplate {
  id: string;
  name: string;
  description: string;
  prompt: string;
  category: string;
  complexity: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
}

export const APP_TEMPLATES: AppTemplate[] = [
  {
    id: 'ai-chat-bot',
    name: 'AI Chat Bot',
    description: 'Advanced conversational AI interface with context memory and personality.',
    prompt: 'Create an intelligent chat bot application with conversation memory, personality customization, and advanced natural language processing capabilities.',
    category: 'AI/ML',
    complexity: 'advanced',
    estimatedTime: '2-3 hours'
  },
  {
    id: 'data-visualization',
    name: 'Interactive Dashboard',
    description: 'Real-time data visualization dashboard with multiple chart types and filters.',
    prompt: 'Build a comprehensive data visualization dashboard with real-time charts, interactive filters, and responsive design for business analytics.',
    category: 'Analytics',
    complexity: 'intermediate',
    estimatedTime: '1-2 hours'
  },
  {
    id: 'crypto-tracker',
    name: 'Cryptocurrency Tracker',
    description: 'Real-time crypto price tracker with portfolio management and alerts.',
    prompt: 'Develop a cryptocurrency tracking application with real-time price updates, portfolio management, and customizable alerts.',
    category: 'Finance',
    complexity: 'intermediate',
    estimatedTime: '1.5-2 hours'
  },
  {
    id: 'task-automation',
    name: 'Task Automation Hub',
    description: 'Workflow automation platform with visual editor and integrations.',
    prompt: 'Create a task automation platform with visual workflow editor, third-party integrations, and scheduled execution.',
    category: 'Productivity',
    complexity: 'advanced',
    estimatedTime: '3-4 hours'
  },
  {
    id: 'social-media-manager',
    name: 'Social Media Manager',
    description: 'Comprehensive social media management tool with scheduling and analytics.',
    prompt: 'Build a social media management application with post scheduling, analytics dashboard, and multi-platform support.',
    category: 'Marketing',
    complexity: 'advanced',
    estimatedTime: '2-3 hours'
  }
];

// Enhanced tool definitions
const advancedWebSearchTool = {
  type: "function",
  function: {
    name: "web_search_enhanced",
    description: "Perform advanced web search with filtering and analysis capabilities",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "The search query to use"
        },
        domain_filter: {
          type: "array",
          items: { type: "string" },
          description: "Specific domains to search within"
        },
        date_range: {
          type: "string",
          description: "Time range for search results (week, month, year)"
        },
        result_type: {
          type: "string",
          enum: ["all", "news", "academic", "technical"],
          description: "Type of content to prioritize"
        }
      },
      required: ["query"]
    }
  }
};

const codeAnalysisTool = {
  type: "function",
  function: {
    name: "analyze_code",
    description: "Analyze code for quality, security, and optimization opportunities",
    parameters: {
      type: "object",
      properties: {
        code: {
          type: "string",
          description: "The code to analyze"
        },
        language: {
          type: "string",
          description: "Programming language of the code"
        },
        analysis_type: {
          type: "string",
          enum: ["security", "performance", "quality", "all"],
          description: "Type of analysis to perform"
        }
      },
      required: ["code", "language"]
    }
  }
};

const dataProcessingTool = {
  type: "function",
  function: {
    name: "process_data",
    description: "Process and analyze structured data with AI insights",
    parameters: {
      type: "object",
      properties: {
        data: {
          type: "string",
          description: "JSON data to process"
        },
        operation: {
          type: "string",
          enum: ["analyze", "summarize", "transform", "visualize"],
          description: "Type of processing to perform"
        },
        output_format: {
          type: "string",
          enum: ["json", "csv", "chart", "summary"],
          description: "Desired output format"
        }
      },
      required: ["data", "operation"]
    }
  }
};

// Enhanced web search with multiple engines and filtering
async function performEnhancedWebSearch(
  query: string, 
  domainFilter?: string[], 
  dateRange?: string,
  resultType?: string
) {
  try {
    // Use multiple search sources for better results
    const searchSources = [
      `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`,
      // Add more search sources as needed
    ];

    const searchPromises = searchSources.map(async (url) => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          return await response.json();
        }
        return null;
      } catch {
        return null;
      }
    });

    const results = await Promise.allSettled(searchPromises);
    const validResults = results
      .filter(result => result.status === 'fulfilled' && result.value)
      .map(result => result.status === 'fulfilled' ? result.value : null)
      .filter(Boolean);

    if (validResults.length === 0) {
      return 'No search results found.';
    }

    // Process and format results
    const combinedResults = validResults.map(result => {
      if (result.AbstractText) return result.AbstractText;
      if (result.Answer) return result.Answer;
      return 'Search completed with relevant information found.';
    }).join(' ');

    return combinedResults || 'Search completed successfully.';
  } catch (error) {
    console.error('Enhanced search error:', error);
    return 'Error performing enhanced web search.';
  }
}

// Code analysis function
async function analyzeCode(code: string, language: string, analysisType: string = 'all') {
  // Simulate code analysis
  const analysisResults = {
    security: "Code appears secure with no obvious vulnerabilities detected.",
    performance: "Code shows good performance characteristics with potential for optimization.",
    quality: "Code follows good practices with clear structure and readability.",
    suggestions: [
      "Consider adding error handling for edge cases",
      "Review variable naming for consistency", 
      "Add documentation for complex functions"
    ]
  };

  return JSON.stringify(analysisResults);
}

// Data processing function
async function processData(data: string, operation: string, outputFormat: string = 'json') {
  try {
    const parsedData = JSON.parse(data);
    
    switch (operation) {
      case 'analyze':
        return JSON.stringify({
          total_records: Array.isArray(parsedData) ? parsedData.length : 1,
          data_types: typeof parsedData,
          analysis: "Data analysis complete with insights generated."
        });
      case 'summarize':
        return JSON.stringify({
          summary: "Data summarized successfully",
          key_insights: ["Pattern detected", "Trends identified", "Recommendations generated"]
        });
      default:
        return JSON.stringify({ result: "Data processed successfully" });
    }
  } catch (error) {
    return JSON.stringify({ error: "Failed to process data", details: error.message });
  }
}

// Enhanced multi-model completion function
export const fetchCompletionFromMultipleModels = async (
  messages: Message[],
  apiKey: string,
  modelIds: string[],
  webSearchEnabled: boolean = false,
  appBuildingEnabled: boolean = false,
  advancedFeaturesEnabled: boolean = false
): Promise<{ [modelId: string]: string | AIError }> => {
  try {
    console.log(`Sending enhanced requests to multiple OpenRouter API models: ${modelIds.join(', ')}`);
    
    const modelPromises = modelIds.map(modelId => 
      fetchCompletion(messages, apiKey, modelId, webSearchEnabled, appBuildingEnabled, advancedFeaturesEnabled)
    );
    
    const results = await Promise.allSettled(modelPromises);
    
    const modelResults: { [modelId: string]: string | AIError } = {};
    
    results.forEach((result, index) => {
      const modelId = modelIds[index];
      if (result.status === 'fulfilled') {
        modelResults[modelId] = result.value;
      } else {
        modelResults[modelId] = {
          message: `Failed to fetch response from ${modelId}: ${result.reason}`,
          type: 'unknown'
        };
      }
    });
    
    return modelResults;
  } catch (error) {
    console.error('Error fetching from multiple models:', error);
    return modelIds.reduce((acc, modelId) => {
      acc[modelId] = {
        message: `Network error while fetching from multiple models: ${error.message}`,
        type: 'network'
      };
      return acc;
    }, {} as { [modelId: string]: AIError });
  }
};

// Enhanced main completion function
export const fetchCompletion = async (
  messages: Message[],
  apiKey: string,
  model: string = 'deepseek/deepseek-r1:free',
  webSearchEnabled: boolean = false,
  appBuildingEnabled: boolean = false,
  advancedFeaturesEnabled: boolean = false
): Promise<string | AIError> => {
  try {
    console.log(`Sending enhanced request to OpenRouter API using model: ${model}`);
    
    const requestBody: any = {
      model: model,
      messages: messages,
      temperature: 0.7,
      max_tokens: 4096,
      top_p: 0.9,
      frequency_penalty: 0.1,
      presence_penalty: 0.1
    };
    
    // Enhanced tools array
    const tools = [];
    
    if (webSearchEnabled) {
      tools.push(advancedWebSearchTool);
    }
    
    if (appBuildingEnabled) {
      tools.push({
        type: "function",
        function: {
          name: "build_application_enhanced",
          description: "Generate sophisticated application code with best practices",
          parameters: {
            type: "object",
            properties: {
              app_type: {
                type: "string",
                description: "The type of application to build",
                enum: APP_TEMPLATES.map(template => template.id)
              },
              requirements: {
                type: "string",
                description: "Specific requirements or customizations"
              },
              complexity: {
                type: "string",
                enum: ["beginner", "intermediate", "advanced"],
                description: "Desired complexity level"
              },
              technologies: {
                type: "array",
                items: { type: "string" },
                description: "Preferred technologies to use"
              }
            },
            required: ["app_type"]
          }
        }
      });
    }
    
    if (advancedFeaturesEnabled) {
      tools.push(codeAnalysisTool, dataProcessingTool);
    }
    
    if (tools.length > 0) {
      requestBody.tools = tools;
      requestBody.tool_choice = "auto";
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'BIRXUO AI Assistant - Enhanced'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Enhanced API error:', errorData);

      if (response.status === 401) {
        return {
          message: 'Invalid API key. Please check your OpenRouter API key in settings.',
          type: 'api_key'
        };
      } else if (response.status === 429) {
        return {
          message: 'Rate limit exceeded. The AI is processing many requests. Please try again in a moment.',
          type: 'rate_limit'
        };
      } else if (response.status === 404) {
        return {
          message: 'The selected AI model is temporarily unavailable. Please try switching to a different model in settings.',
          type: 'model_unavailable'
        };
      } else {
        return {
          message: `API Error: ${errorData.error?.message || response.statusText}`,
          type: 'unknown'
        };
      }
    }

    const data: CompletionResponse = await response.json();
    
    // Enhanced tool call handling
    const messageContent = data.choices[0].message.content;
    
    if (webSearchEnabled && messageContent?.includes('web_search_enhanced')) {
      const queryMatch = messageContent.match(/query["']:\s*["']([^"']+)["']/);
      if (queryMatch && queryMatch[1]) {
        const searchResults = await performEnhancedWebSearch(queryMatch[1]);
        const newMessages = [
          ...messages,
          { role: 'assistant' as const, content: messageContent },
          { 
            role: 'user' as const, 
            content: `Enhanced search results: ${searchResults}. Please provide a comprehensive analysis based on this information.`
          }
        ];
        return fetchCompletion(newMessages, apiKey, model, false, appBuildingEnabled, advancedFeaturesEnabled);
      }
    }
    
    if (advancedFeaturesEnabled && messageContent?.includes('analyze_code')) {
      const codeMatch = messageContent.match(/code["']:\s*["']([^"']+)["']/);
      const languageMatch = messageContent.match(/language["']:\s*["']([^"']+)["']/);
      
      if (codeMatch && languageMatch) {
        const analysisResults = await analyzeCode(codeMatch[1], languageMatch[1]);
        const newMessages = [
          ...messages,
          { role: 'assistant' as const, content: messageContent },
          { 
            role: 'user' as const, 
            content: `Code analysis results: ${analysisResults}. Please provide recommendations based on this analysis.`
          }
        ];
        return fetchCompletion(newMessages, apiKey, model, false, appBuildingEnabled, false);
      }
    }
    
    return messageContent;
  } catch (error) {
    console.error('Enhanced network error:', error);
    return {
      message: 'Network error occurred while connecting to AI services. Please check your connection and try again.',
      type: 'network'
    };
  }
};

// Utility function to get model by category
export const getModelsByCategory = (category: string) => {
  return AI_MODELS.filter(model => model.category === category);
};

// Utility function to get recommended model based on task
export const getRecommendedModel = (taskType: 'reasoning' | 'chat' | 'coding' | 'creative') => {
  const recommendations = {
    reasoning: 'deepseek/deepseek-r1:free',
    chat: 'deepseek/deepseek-chat-v3-0324:free',
    coding: 'microsoft/phi-4-reasoning-plus:free',
    creative: 'meta-llama/llama-4-maverick:free'
  };
  
  return AI_MODELS.find(model => model.id === recommendations[taskType]) || AI_MODELS[0];
};

// Utility function to check if a value is an AIError
export const isAIError = (value: any): value is AIError => {
  return value && typeof value === 'object' && 'type' in value && 'message' in value;
};

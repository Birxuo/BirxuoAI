
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { fetchCompletion, isAIError, AIError } from '@/services/ai-service';
import { generateSpeech, playAudio, DEFAULT_VOICE_ID, DEFAULT_MODEL_ID, DEFAULT_API_KEY as ELEVENLABS_DEFAULT_API_KEY } from '@/services/elevenlabs-service';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface AIContextType {
  messages: Message[];
  apiKey: string;
  setApiKey: (key: string) => void;
  isLoading: boolean;
  lastError: AIError | null;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  audioEnabled: boolean;
  toggleAudio: () => void;
  elevenLabsApiKey: string;
  setElevenLabsApiKey: (key: string) => void;
  elevenLabsVoiceId: string;
  setElevenLabsVoiceId: (voiceId: string) => void;
  webSearchEnabled: boolean;
  toggleWebSearch: () => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

// Default OpenRouter API key
const DEFAULT_API_KEY = '';

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};

interface AIProviderProps {
  children: ReactNode;
}

export const AIProvider: React.FC<AIProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [apiKey, setApiKey] = useState<string>(DEFAULT_API_KEY);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastError, setLastError] = useState<AIError | null>(null);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState<string>(ELEVENLABS_DEFAULT_API_KEY);
  const [elevenLabsVoiceId, setElevenLabsVoiceId] = useState<string>(DEFAULT_VOICE_ID);
  const [webSearchEnabled, setWebSearchEnabled] = useState<boolean>(false);
  const { toast } = useToast();

  // Load API key from localStorage on mount, fallback to default key
  useEffect(() => {
    const savedApiKey = localStorage.getItem('openrouter_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
    
    // Load audio preference from localStorage
    const savedAudioPreference = localStorage.getItem('audio_enabled');
    if (savedAudioPreference) {
      setAudioEnabled(savedAudioPreference === 'true');
    }

    // Load ElevenLabs API key from localStorage
    const savedElevenLabsApiKey = localStorage.getItem('elevenlabs_api_key');
    if (savedElevenLabsApiKey) {
      setElevenLabsApiKey(savedElevenLabsApiKey);
    }

    // Load ElevenLabs voice ID from localStorage
    const savedElevenLabsVoiceId = localStorage.getItem('elevenlabs_voice_id');
    if (savedElevenLabsVoiceId) {
      setElevenLabsVoiceId(savedElevenLabsVoiceId);
    }

    // Load web search preference from localStorage
    const savedWebSearchPreference = localStorage.getItem('web_search_enabled');
    if (savedWebSearchPreference) {
      setWebSearchEnabled(savedWebSearchPreference === 'true');
    }
  }, []);

  // Save API key to localStorage when it changes
  useEffect(() => {
    if (apiKey && apiKey !== DEFAULT_API_KEY) {
      localStorage.setItem('openrouter_api_key', apiKey);
    }
  }, [apiKey]);

  // Save audio preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('audio_enabled', audioEnabled.toString());
  }, [audioEnabled]);

  // Save ElevenLabs API key to localStorage when it changes
  useEffect(() => {
    if (elevenLabsApiKey) {
      localStorage.setItem('elevenlabs_api_key', elevenLabsApiKey);
    }
  }, [elevenLabsApiKey]);

  // Save ElevenLabs voice ID to localStorage when it changes
  useEffect(() => {
    if (elevenLabsVoiceId) {
      localStorage.setItem('elevenlabs_voice_id', elevenLabsVoiceId);
    }
  }, [elevenLabsVoiceId]);

  // Save web search preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('web_search_enabled', webSearchEnabled.toString());
  }, [webSearchEnabled]);

  const toggleAudio = () => {
    setAudioEnabled(prev => !prev);
  };

  const toggleWebSearch = () => {
    setWebSearchEnabled(prev => !prev);
  };

  const playAudioResponse = async (text: string) => {
    if (!audioEnabled) return;

    try {
      const audioBuffer = await generateSpeech({
        text,
        voiceId: elevenLabsVoiceId,
        apiKey: elevenLabsApiKey
      });

      if (audioBuffer) {
        await playAudio(audioBuffer);
      }
    } catch (error) {
      console.error('Error with ElevenLabs TTS:', error);
      toast({
        title: "Audio Error",
        description: "Could not generate audio with ElevenLabs. Falling back to browser TTS.",
        variant: "destructive",
      });
      // Fallback to browser TTS
      playBrowserTTS(text);
    }
  };

  const playBrowserTTS = (text: string) => {
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      // Select a slightly robotic/computer-like voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoices = voices.filter(voice => 
        voice.name.includes('Google') || 
        voice.name.includes('Microsoft') || 
        voice.name.toLowerCase().includes('en-us')
      );
      
      if (preferredVoices.length > 0) {
        utterance.voice = preferredVoices[0];
      }
      
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error playing browser TTS:', error);
      toast({
        title: "Audio Error",
        description: "Could not play audio response. Check if your browser supports speech synthesis.",
        variant: "destructive",
      });
    }
  };

  const sendMessage = async (content: string) => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenRouter API key in the settings",
        variant: "destructive",
      });
      return;
    }

    if (!content.trim()) {
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setLastError(null);

    // Prepare the messages array for the API call
    const systemContent = webSearchEnabled
      ? 'You are BIRXUO, an advanced AI assistant with web search capabilities. When asked about current events, facts, or information that might need verification, use your web search to provide accurate and up-to-date information. Be helpful, accurate, and conversational. If you don\'t know the answer to something, try to search for it. Always cite your sources.'
      : 'You are BIRXUO, an advanced AI assistant. Be helpful, accurate, and conversational. If you don\'t know the answer to something, be honest about it.';

    const systemMessage = {
      role: 'system' as const,
      content: systemContent
    };

    const messagesToSend = [
      systemMessage,
      ...messages
        .filter(m => m.role === 'user' || m.role === 'assistant')
        .slice(-10) // Just send last 10 messages for context
        .map(m => ({ role: m.role, content: m.content })),
      { role: 'user' as const, content }
    ];

    try {
      const response = await fetchCompletion(messagesToSend, apiKey, webSearchEnabled);

      if (isAIError(response)) {
        setLastError(response);
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
      } else {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, assistantMessage]);
        
        // Play audio response if enabled
        if (audioEnabled) {
          playAudioResponse(response);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setLastError({
        message: 'An unexpected error occurred. Please try again.',
        type: 'unknown'
      });
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <AIContext.Provider
      value={{
        messages,
        apiKey,
        setApiKey,
        isLoading,
        lastError,
        sendMessage,
        clearMessages,
        audioEnabled,
        toggleAudio,
        elevenLabsApiKey,
        setElevenLabsApiKey,
        elevenLabsVoiceId,
        setElevenLabsVoiceId,
        webSearchEnabled,
        toggleWebSearch
      }}
    >
      {children}
    </AIContext.Provider>
  );
};

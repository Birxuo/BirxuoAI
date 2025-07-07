
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { fetchCompletion, fetchCompletionFromMultipleModels, isAIError, AIError, AI_MODELS, APP_TEMPLATES, AppTemplate } from '@/services/ai-service';
import { generateSpeech, playAudio, DEFAULT_VOICE_ID, DEFAULT_MODEL_ID, DEFAULT_API_KEY as ELEVENLABS_DEFAULT_API_KEY } from '@/services/elevenlabs-service';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  modelId?: string; // Add modelId to track which model generated this message
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
  appBuildingEnabled: boolean;
  toggleAppBuilding: () => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  availableModels: typeof AI_MODELS;
  availableAppTemplates: typeof APP_TEMPLATES;
  autoExpand: boolean;
  toggleAutoExpand: () => void;
  multiModelEnabled: boolean;
  toggleMultiModel: () => void;
  selectedModels: string[];
  addModelToComparison: (modelId: string) => void;
  removeModelFromComparison: (modelId: string) => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

// Default OpenRouter API key
const DEFAULT_API_KEY = 'YOUR API KEY';
const DEFAULT_MODEL = 'qwen/qwen3-235b-a22b:free';

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
  const [appBuildingEnabled, setAppBuildingEnabled] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<string>(DEFAULT_MODEL);
  const [autoExpand, setAutoExpand] = useState<boolean>(true);
  const [multiModelEnabled, setMultiModelEnabled] = useState<boolean>(false);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const { toast } = useToast();

  // Load settings from localStorage on mount
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

    // Load selected model from localStorage
    const savedModel = localStorage.getItem('selected_model');
    if (savedModel) {
      setSelectedModel(savedModel);
    }
    
    // Load auto expand preference from localStorage
    const savedAutoExpand = localStorage.getItem('auto_expand');
    if (savedAutoExpand) {
      setAutoExpand(savedAutoExpand === 'true');
    }

    // Load app building preference from localStorage
    const savedAppBuildingPreference = localStorage.getItem('app_building_enabled');
    if (savedAppBuildingPreference) {
      setAppBuildingEnabled(savedAppBuildingPreference === 'true');
    }

    // Load multi-model preference from localStorage
    const savedMultiModelPreference = localStorage.getItem('multi_model_enabled');
    if (savedMultiModelPreference) {
      setMultiModelEnabled(savedMultiModelPreference === 'true');
    }

    // Load selected models from localStorage
    const savedSelectedModels = localStorage.getItem('selected_models');
    if (savedSelectedModels) {
      setSelectedModels(JSON.parse(savedSelectedModels));
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

  // Save selected model to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('selected_model', selectedModel);
  }, [selectedModel]);
  
  // Save auto expand preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('auto_expand', autoExpand.toString());
  }, [autoExpand]);

  // Save app building preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('app_building_enabled', appBuildingEnabled.toString());
  }, [appBuildingEnabled]);

  // Save multi-model preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('multi_model_enabled', multiModelEnabled.toString());
  }, [multiModelEnabled]);

  // Save selected models to localStorage when they change
  useEffect(() => {
    localStorage.setItem('selected_models', JSON.stringify(selectedModels));
  }, [selectedModels]);

  const toggleAudio = () => {
    setAudioEnabled(prev => !prev);
  };

  const toggleWebSearch = () => {
    setWebSearchEnabled(prev => !prev);
  };
  
  const toggleAppBuilding = () => {
    setAppBuildingEnabled(prev => !prev);
  };
  
  const toggleAutoExpand = () => {
    setAutoExpand(prev => !prev);
  };

  const toggleMultiModel = () => {
    setMultiModelEnabled(prev => !prev);
    
    // Initialize selected models if enabling for the first time
    if (!multiModelEnabled && selectedModels.length === 0) {
      setSelectedModels([selectedModel]);
    }
  };

  const addModelToComparison = (modelId: string) => {
    if (!selectedModels.includes(modelId)) {
      setSelectedModels(prev => [...prev, modelId]);
    }
  };

  const removeModelFromComparison = (modelId: string) => {
    if (selectedModels.length > 1) {
      setSelectedModels(prev => prev.filter(id => id !== modelId));
    } else {
      toast({
        title: "Cannot Remove Model",
        description: "You must have at least one model selected for comparison.",
        variant: "destructive",
      });
    }
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

    // Prepare system message with model info and capabilities
    const modelInfo = AI_MODELS.find(m => m.id === selectedModel);
    const modelName = modelInfo ? modelInfo.name : 'AI';

    // Prepare system message content
    let systemContent = `You are BIRXUO, an advanced AI assistant powered by ${modelName}.`;
    
    if (webSearchEnabled) {
      systemContent += ` You have web search capabilities. When asked about current events, facts, or information that might need verification, use your web search to provide accurate and up-to-date information.`;
    }
    
    if (appBuildingEnabled) {
      systemContent += ` You have application building capabilities. When asked to create or build an app, website, or specific software functionality, you can generate code and instructions to build it.`;
    }
    
    systemContent += ` Be helpful, accurate, and conversational. If you don't know the answer to something, be honest about it.`;

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
      if (multiModelEnabled && selectedModels.length > 0) {
        // Send the message to multiple models
        const multiModelResponses = await fetchCompletionFromMultipleModels(
          messagesToSend,
          apiKey,
          selectedModels,
          webSearchEnabled,
          appBuildingEnabled
        );
        
        // Process responses from each model
        for (const [modelId, response] of Object.entries(multiModelResponses)) {
          if (isAIError(response)) {
            setLastError(response);
            toast({
              title: `Error with ${AI_MODELS.find(m => m.id === modelId)?.name || modelId}`,
              description: response.message,
              variant: "destructive",
            });
          } else {
            const modelInfo = AI_MODELS.find(m => m.id === modelId);
            const assistantMessage: Message = {
              id: `${Date.now()}-${modelId}`,
              role: 'assistant',
              content: response,
              timestamp: new Date(),
              modelId: modelId
            };
            setMessages(prev => [...prev, assistantMessage]);
            
            // Play audio response from the first successful model if enabled
            if (audioEnabled && modelId === selectedModels[0]) {
              playAudioResponse(response);
            }
          }
        }
      } else {
        // Send the message to a single model (original behavior)
        const response = await fetchCompletion(
          messagesToSend, 
          apiKey, 
          selectedModel, 
          webSearchEnabled,
          appBuildingEnabled
        );

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
            modelId: selectedModel
          };
          setMessages(prev => [...prev, assistantMessage]);
          
          // Play audio response if enabled
          if (audioEnabled) {
            playAudioResponse(response);
          }
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
        toggleWebSearch,
        appBuildingEnabled,
        toggleAppBuilding,
        selectedModel,
        setSelectedModel,
        availableModels: AI_MODELS,
        availableAppTemplates: APP_TEMPLATES,
        autoExpand,
        toggleAutoExpand,
        multiModelEnabled,
        toggleMultiModel,
        selectedModels,
        addModelToComparison,
        removeModelFromComparison
      }}
    >
      {children}
    </AIContext.Provider>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SendHorizontal, Loader2, Terminal, Volume2, VolumeX, Info, Mic, MicOff, Search, SearchX, Code, FileCode, Split, Plus, Box } from 'lucide-react';
import { useAI } from '@/context/AIContext';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ChatInputProps {
  onOpenProjectBuilder?: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onOpenProjectBuilder }) => {
  const [input, setInput] = useState('');
  const {
    sendMessage,
    isLoading,
    audioEnabled,
    toggleAudio,
    elevenLabsApiKey,
    webSearchEnabled,
    toggleWebSearch,
    appBuildingEnabled,
    toggleAppBuilding,
    multiModelEnabled,
    toggleMultiModel
  } = useAI();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isListening, setIsListening] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState<SpeechRecognition | null>(null);
  
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      recognition.onresult = event => {
        const transcript = Array.from(event.results).map(result => result[0]).map(result => result.transcript).join('');
        setInput(transcript);
      };
      recognition.onerror = event => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
      recognition.onend = () => {
        setIsListening(false);
      };
      setSpeechRecognition(recognition);
    }
    return () => {
      if (speechRecognition) {
        speechRecognition.stop();
      }
    };
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      await sendMessage(input);
      setInput('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  const toggleListening = () => {
    if (!speechRecognition) {
      return;
    }
    if (isListening) {
      speechRecognition.stop();
      setIsListening(false);
    } else {
      speechRecognition.start();
      setIsListening(true);
    }
  };
  
  const isSpeechRecognitionSupported = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;

  return (
    <div className="border-t border-gray-800/50 bg-[#1a1a1a]/80 backdrop-blur-xl p-4 w-full rounded-t-xl fixed bottom-4 left-0 right-0 z-50">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex gap-2 items-center">
        <Button 
          type="button" 
          variant="ghost" 
          className="p-1 h-8 w-8 rounded hover:bg-gray-800"
        >
          <Plus className="h-4 w-4 text-gray-400" />
        </Button>
        
        <div className="flex-grow relative">
          <Textarea 
            ref={textareaRef} 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            onKeyDown={handleKeyDown} 
            placeholder="Ask anything..." 
            className="min-h-[48px] max-h-[200px] resize-none pl-3 pr-10 py-3 bg-[#2a2a2a] border-0 rounded-full text-sm focus:ring-0 focus:outline-none text-gray-200" 
            disabled={isLoading}
            rows={1}
          />
          
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
            {webSearchEnabled && (
              <Search className="h-4 w-4 text-gray-400 opacity-60" />
            )}
          </div>
        </div>
        
        <Button 
          type="submit" 
          disabled={isLoading || !input.trim()} 
          variant="ghost"
          className={`p-1 h-8 w-8 rounded ${input.trim() ? 'text-white bg-blue-600 hover:bg-blue-700' : 'text-gray-400 hover:bg-gray-800'}`}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <SendHorizontal className="h-4 w-4" />
          )}
        </Button>
        
        {isSpeechRecognitionSupported && (
          <Button 
            type="button" 
            variant="ghost" 
            onClick={toggleListening} 
            className={`p-1 h-8 w-8 rounded ${isListening ? 'text-white bg-blue-600 hover:bg-blue-700' : 'text-gray-400 hover:bg-gray-800'}`}
          >
            {isListening ? (
              <Mic className="h-4 w-4" />
            ) : (
              <MicOff className="h-4 w-4" />
            )}
          </Button>
        )}
      </form>
      
      <div className="max-w-4xl mx-auto mt-2 flex justify-center">
        <div className="flex gap-1.5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="sm" 
                  variant="ghost"
                  type="button"
                  onClick={toggleWebSearch}
                  className={`text-xs rounded-full h-7 px-3 ${webSearchEnabled ? 'bg-gray-700 text-gray-300' : 'bg-transparent text-gray-500'} hover:bg-gray-800`}
                >
                  <Search className="h-3 w-3 mr-1.5" />
                  Search
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                {webSearchEnabled ? "Disable web search" : "Enable web search"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="sm" 
                  variant="ghost"
                  type="button"
                  onClick={toggleAppBuilding}
                  className={`text-xs rounded-full h-7 px-3 ${appBuildingEnabled ? 'bg-gray-700 text-gray-300' : 'bg-transparent text-gray-500'} hover:bg-gray-800`}
                >
                  <Code className="h-3 w-3 mr-1.5" />
                  Build
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                {appBuildingEnabled ? "Disable app building" : "Enable app building"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="sm" 
                  variant="ghost"
                  type="button"
                  onClick={onOpenProjectBuilder}
                  className="text-xs rounded-full h-7 px-3 bg-transparent text-gray-500 hover:bg-gray-800"
                >
                  <Box className="h-3 w-3 mr-1.5" />
                  Projects
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                Open project builder
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="sm" 
                  variant="ghost"
                  type="button"
                  onClick={toggleAudio}
                  className={`text-xs rounded-full h-7 px-3 ${audioEnabled ? 'bg-gray-700 text-gray-300' : 'bg-transparent text-gray-500'} hover:bg-gray-800`}
                >
                  {audioEnabled ? (
                    <Volume2 className="h-3 w-3 mr-1.5" />
                  ) : (
                    <VolumeX className="h-3 w-3 mr-1.5" />
                  )}
                  Voice
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                {audioEnabled ? "Disable voice" : "Enable voice"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="sm" 
                  variant="ghost"
                  type="button"
                  onClick={toggleMultiModel}
                  className={`text-xs rounded-full h-7 px-3 ${multiModelEnabled ? 'bg-gray-700 text-gray-300' : 'bg-transparent text-gray-500'} hover:bg-gray-800`}
                >
                  <Split className="h-3 w-3 mr-1.5" />
                  Compare
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                {multiModelEnabled ? "Disable model comparison" : "Enable model comparison"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;

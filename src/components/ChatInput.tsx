import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SendHorizontal, Loader2, Terminal, Volume2, VolumeX, Info, Mic, MicOff, Search, SearchX } from 'lucide-react';
import { useAI } from '@/context/AIContext';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
const ChatInput: React.FC = () => {
  const [input, setInput] = useState('');
  const {
    sendMessage,
    isLoading,
    audioEnabled,
    toggleAudio,
    elevenLabsApiKey,
    webSearchEnabled,
    toggleWebSearch
  } = useAI();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isListening, setIsListening] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState<SpeechRecognition | null>(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }

    // Initialize speech recognition if supported
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

  // Determine audio button status and tooltip content
  const audioButtonStatus = () => {
    if (!audioEnabled) {
      return {
        icon: <VolumeX className="h-5 w-5 text-muted-foreground" />,
        tooltip: "Enable text-to-speech"
      };
    }
    if (audioEnabled && !elevenLabsApiKey) {
      return {
        icon: <div className="relative">
            <Volume2 className="h-5 w-5 text-yellow-500" />
            <Info className="h-3 w-3 text-yellow-500 absolute -top-1 -right-1" />
          </div>,
        tooltip: "Using browser TTS (Set ElevenLabs API key in settings for better quality)"
      };
    }
    return {
      icon: <Volume2 className="h-5 w-5 text-primary" />,
      tooltip: "Using ElevenLabs TTS (High quality)"
    };
  };

  // Search button status and tooltip
  const searchButtonStatus = () => {
    return {
      icon: webSearchEnabled ? <Search className="h-5 w-5 text-primary" /> : <SearchX className="h-5 w-5 text-muted-foreground" />,
      tooltip: webSearchEnabled ? "Web search enabled" : "Enable web search"
    };
  };
  const {
    icon,
    tooltip
  } = audioButtonStatus();
  const {
    icon: searchIcon,
    tooltip: searchTooltip
  } = searchButtonStatus();

  // Check browser support for speech recognition
  const isSpeechRecognitionSupported = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.3,
    delay: 0.2
  }} className="sticky bottom-0 w-full p-4 backdrop-blur-lg border-t border-primary/20 px-[16px] bg-zinc-950 rounded-3xl">
      <form onSubmit={handleSubmit} className="flex gap-2 items-end max-w-3xl mx-auto">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" size="icon" variant="ghost" onClick={toggleAudio} className="h-[60px] w-[60px] rounded-full hover:bg-primary/20 transition-all duration-300 ease-in-out" aria-label={audioEnabled ? "Disable audio" : "Enable audio"}>
                {icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              {tooltip}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" size="icon" variant="ghost" onClick={toggleWebSearch} className="h-[60px] w-[60px] rounded-full hover:bg-primary/20 transition-all duration-300 ease-in-out" aria-label={webSearchEnabled ? "Disable web search" : "Enable web search"}>
                {searchIcon}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              {searchTooltip}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="flex-grow relative">
          <Terminal className="absolute left-3 top-3 h-5 w-5 text-primary/40" />
          <Textarea ref={textareaRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Enter command..." className="min-h-[60px] max-h-[200px] resize-none hacker-input pl-10 terminal-text" disabled={isLoading} />
        </div>

        {isSpeechRecognitionSupported && <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type="button" size="icon" variant={isListening ? "default" : "ghost"} onClick={toggleListening} className="h-[60px] w-[60px] rounded-full hover:bg-primary/20 transition-all duration-300 ease-in-out" aria-label={isListening ? "Stop listening" : "Start listening"}>
                  {isListening ? <Mic className="h-5 w-5 text-white animate-pulse" /> : <MicOff className="h-5 w-5 text-muted-foreground" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                {isListening ? "Stop listening" : "Start speech recognition"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>}
        
        <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="h-[60px] w-[60px] rounded-full glowing-border hover:bg-primary/20 transition-all duration-300 ease-in-out">
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <SendHorizontal className="h-5 w-5" />}
        </Button>
      </form>
    </motion.div>;
};
export default ChatInput;
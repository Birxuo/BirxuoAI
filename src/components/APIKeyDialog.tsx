
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings, Check, Terminal, Info, Volume2 } from 'lucide-react';
import { useAI } from '@/context/AIContext';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { DEFAULT_API_KEY } from '@/services/elevenlabs-service';
import { AVAILABLE_VOICES } from '@/services/elevenlabs-service';

const APIKeyDialog: React.FC = () => {
  const { 
    apiKey, 
    setApiKey, 
    elevenLabsApiKey, 
    setElevenLabsApiKey,
    elevenLabsVoiceId,
    setElevenLabsVoiceId
  } = useAI();
  const [inputApiKey, setInputApiKey] = useState(apiKey);
  const [inputElevenLabsApiKey, setInputElevenLabsApiKey] = useState(elevenLabsApiKey);
  const [inputVoiceId, setInputVoiceId] = useState(elevenLabsVoiceId);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const saveApiKey = () => {
    setApiKey(inputApiKey);
    setElevenLabsApiKey(inputElevenLabsApiKey);
    setElevenLabsVoiceId(inputVoiceId);
    setOpen(false);
    toast({
      title: "Settings Saved",
      description: "Your API keys and voice settings have been saved.",
    });
  };

  const isDefaultKey = apiKey === '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';
  const isDefaultElevenLabsKey = elevenLabsApiKey === DEFAULT_API_KEY;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-primary hover:text-primary/80 hover:bg-primary/10">
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md glass-panel border-primary/30">
        <DialogHeader>
          <DialogTitle className="terminal-text">API Configuration</DialogTitle>
          <DialogDescription className="text-foreground/70">
            Configure the API keys for BIRXUO and voice settings.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="api-key" className="terminal-text">OpenRouter API Key</Label>
            <Input
              id="api-key"
              type="password"
              value={inputApiKey}
              onChange={(e) => setInputApiKey(e.target.value)}
              placeholder="sk-or-..."
              className="hacker-input terminal-text"
            />
          </div>
          
          {isDefaultKey && (
            <div className="flex items-start gap-2 text-sm p-3 bg-primary/5 text-foreground/80 border border-primary/20 rounded-md">
              <Terminal className="h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <p className="font-medium terminal-text">Using Default API Key</p>
                <p className="mt-1 text-foreground/70">
                  BIRXUO is currently using the default API key. You can start chatting immediately, but for higher usage limits, consider getting your own free key at{' '}
                  <a 
                    href="https://openrouter.ai/keys" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-primary hover:text-primary/80 underline font-medium"
                  >
                    openrouter.ai/keys
                  </a>
                </p>
              </div>
            </div>
          )}
          
          {!isDefaultKey && (
            <div className="flex items-center gap-2 text-sm p-3 bg-primary/10 border border-primary/30 text-foreground rounded-md">
              <Check className="h-5 w-5 text-primary" />
              <span className="terminal-text">Using your custom API key</span>
            </div>
          )}

          <div className="space-y-2 pt-4 border-t border-primary/20">
            <Label htmlFor="elevenlabs-key" className="terminal-text flex items-center gap-2">
              <Volume2 className="h-4 w-4" /> ElevenLabs API Key
            </Label>
            <Input
              id="elevenlabs-key"
              type="password"
              value={inputElevenLabsApiKey}
              onChange={(e) => setInputElevenLabsApiKey(e.target.value)}
              placeholder="sk_..."
              className="hacker-input terminal-text"
            />
            {isDefaultElevenLabsKey && (
              <div className="flex items-start gap-2 text-sm p-3 bg-primary/5 text-foreground/80 border border-primary/20 rounded-md">
                <Info className="h-5 w-5 flex-shrink-0 text-primary" />
                <p className="text-foreground/70">
                  Using the default ElevenLabs API key for high-quality voice.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="voice-selection" className="terminal-text">Voice Selection</Label>
            <select
              id="voice-selection"
              value={inputVoiceId}
              onChange={(e) => setInputVoiceId(e.target.value)}
              className="w-full hacker-input terminal-text p-2 rounded-md bg-background border border-primary/30"
            >
              {AVAILABLE_VOICES.map(voice => (
                <option key={voice.id} value={voice.id}>
                  {voice.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={saveApiKey} disabled={!inputApiKey.trim()} className="glowing-border hover:bg-primary/20">
            Save Configuration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default APIKeyDialog;

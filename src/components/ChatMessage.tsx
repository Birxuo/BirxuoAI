
import React, { useEffect, useRef } from 'react';
import { Message } from '@/context/AIContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <motion.div
      ref={messageRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'flex mb-4 max-w-[85%] md:max-w-[75%]',
        isUser ? 'ml-auto' : 'mr-auto'
      )}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-1">
          <Bot className="h-4 w-4 text-primary" />
        </div>
      )}
      
      <div
        className={cn(
          'px-4 py-3 rounded-md text-sm md:text-base',
          isUser 
            ? 'bg-primary/20 text-foreground border border-primary/30 glowing-border' 
            : 'glass-panel'
        )}
      >
        <div className="terminal-text whitespace-pre-wrap">{message.content}</div>
        <div className={cn(
          'text-xs mt-1 opacity-70 text-right',
          isUser ? 'text-foreground/60' : 'text-foreground/60'
        )}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center ml-2 mt-1">
          <User className="h-4 w-4 text-primary" />
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;

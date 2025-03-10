
import React, { useRef, useEffect } from 'react';
import { useAI } from '@/context/AIContext';
import ChatMessage from './ChatMessage';
import AIThoughtProcess from './AIThoughtProcess';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const ChatWindow: React.FC = () => {
  const {
    messages,
    isLoading
  } = useAI();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [messages]);

  return <div className="flex-1 overflow-y-auto p-4 pb-20 space-y-4">
      {messages.length === 0 ? <motion.div className="h-full flex flex-col items-center justify-center text-center p-8" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 0.5
    }}>
          <div className="glass-panel p-6 max-w-md">
            <h2 className="text-2xl font-light mb-4">Welcome to BIRXUO AI</h2>
            <p className="text-muted-foreground mb-6">I'm your AI assistant powered by BIRXUOGROUP through OpenRouter. Ask me anything to get started!</p>
            <div className="text-sm text-muted-foreground">
              <p>Some things you can try:</p>
              <ul className="mt-2 space-y-1 text-left list-disc list-inside">
                <li>Explain quantum computing</li>
                <li>Write a short story about serial killer</li>
                <li>create a python code about algo trading</li>
                <li>What is the purpose of our existence</li>
              </ul>
            </div>
          </div>
        </motion.div> : <>
          {messages.map(message => <ChatMessage key={message.id} message={message} />)}
        </>}
      
      {isLoading && (
        <>
          <AIThoughtProcess />
          <motion.div className="flex items-center space-x-2 glass-panel px-4 py-3 rounded-2xl rounded-tl-none w-fit" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.3
          }}>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">BIRXUO is thinking...</span>
          </motion.div>
        </>
      )}
      
      <div ref={messagesEndRef} />
    </div>;
};

export default ChatWindow;

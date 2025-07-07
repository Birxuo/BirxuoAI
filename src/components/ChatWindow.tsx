
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useAI } from '@/context/AIContext';
import ChatMessage from './ChatMessage';
import AIThoughtProcess from './AIThoughtProcess';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, BrainCircuit, AlertCircle, Settings, MessageSquare, Sparkles, Zap } from 'lucide-react';

const ChatWindow: React.FC = () => {
  const {
    messages,
    isLoading,
    autoExpand,
    lastError
  } = useAI();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  // Check if user is near bottom of chat
  const isNearBottom = useCallback(() => {
    if (!chatContainerRef.current) return true;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    return scrollHeight - scrollTop - clientHeight < 100;
  }, []);

  // Handle manual scrolling
  const handleScroll = useCallback(() => {
    if (!chatContainerRef.current) return;
    
    const nearBottom = isNearBottom();
    setShouldAutoScroll(nearBottom);
    
    // Clear the scrolling flag after a delay
    setIsUserScrolling(true);
    setTimeout(() => setIsUserScrolling(false), 150);
  }, [isNearBottom]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current && shouldAutoScroll && !isUserScrolling) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [messages, shouldAutoScroll, isUserScrolling]);

  // Always auto-scroll when loading starts (new message being generated)
  useEffect(() => {
    if (isLoading && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth'
      });
      setShouldAutoScroll(true);
    }
  }, [isLoading]);

  const isModelUnavailableError = lastError?.type === 'model_unavailable';

  return (
    <div 
      ref={chatContainerRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto p-4 pb-40 space-y-6 relative"
    >
      {/* Enhanced background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/3 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      {messages.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="h-full flex flex-col items-center justify-center text-center p-8 relative z-10"
        >
          <div className="max-w-2xl">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="relative">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center"
                >
                  <BrainCircuit className="w-10 h-10 text-primary" />
                </motion.div>
                
                {/* Floating particles around the brain icon */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-primary/30 rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                    animate={{
                      x: [0, Math.cos(i * Math.PI / 4) * 60],
                      y: [0, Math.sin(i * Math.PI / 4) * 60],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl font-light mb-6 text-white"
            >
              What can I help with?
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-4"
            >
              <p className="text-lg text-foreground/70 mb-8">
                I'm BIRXUO, an advanced AI assistant powered by cutting-edge language models. 
                I can help with coding, analysis, creative tasks, and complex problem-solving.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {[
                  { icon: <Sparkles className="w-5 h-5" />, title: "Creative Projects", desc: "Writing, design, and brainstorming" },
                  { icon: <Zap className="w-5 h-5" />, title: "Code & Development", desc: "Programming help and debugging" },
                  { icon: <BrainCircuit className="w-5 h-5" />, title: "Analysis & Research", desc: "Data analysis and research tasks" },
                  { icon: <MessageSquare className="w-5 h-5" />, title: "General Assistance", desc: "Questions and conversations" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      transition: { duration: 0.2 }
                    }}
                    className="p-4 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm cursor-pointer group"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="text-primary group-hover:scale-110 transition-transform duration-200">
                        {item.icon}
                      </div>
                      <h3 className="font-medium text-white">{item.title}</h3>
                    </div>
                    <p className="text-sm text-foreground/60">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <div className="relative z-10">
          <AnimatePresence>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </AnimatePresence>
        </div>
      )}
      
      {/* Enhanced Model Unavailable Error */}
      {isModelUnavailableError && (
        <motion.div 
          className="flex items-start p-6 bg-gradient-to-br from-red-900/20 to-red-800/10 text-foreground rounded-xl border border-red-900/30 mb-4 backdrop-blur-sm relative z-10" 
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <AlertCircle className="h-6 w-6 text-red-400 mr-4 mt-0.5" />
          </motion.div>
          <div className="flex-1">
            <div className="font-semibold text-lg mb-2">AI Model Temporarily Unavailable</div>
            <p className="text-sm text-gray-300 mb-3">
              The selected AI model is currently experiencing high demand or maintenance. 
              This is common with popular models during peak usage.
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Try switching to a different model in</span>
              <motion.a 
                href="#" 
                className="inline-flex items-center text-gray-200 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Settings className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">Settings</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Enhanced Loading State */}
      {isLoading && (
        <div className="relative z-10">
          <AIThoughtProcess />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center space-x-3 px-6 py-4 rounded-xl w-fit bg-gradient-to-r from-zinc-800/90 to-zinc-700/90 border border-white/10 backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="h-5 w-5 text-primary" />
            </motion.div>
            <div>
              <motion.span 
                className="text-sm font-medium text-gray-200"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                BIRXUO is processing your request...
              </motion.span>
              <div className="text-xs text-gray-400 mt-1">
                Using advanced AI reasoning and analysis
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWindow;

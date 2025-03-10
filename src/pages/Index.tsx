
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import ChatWindow from '@/components/ChatWindow';
import ChatInput from '@/components/ChatInput';
import { useAI } from '@/context/AIContext';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const Index = () => {
  const { webSearchEnabled } = useAI();
  
  useEffect(() => {
    // Set page title
    document.title = "BIRXUO | AI Terminal";
  }, []);

  return (
    <motion.div 
      className="flex flex-col h-screen bg-background matrix-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="scan-line"></div>
      <Header />
      
      {webSearchEnabled && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center gap-2 bg-primary/10 py-1 px-4 text-xs text-primary border-b border-primary/20"
        >
          <Search className="h-3 w-3" />
          <span>Web search enabled - BIRXUO can now search the internet for information</span>
        </motion.div>
      )}
      
      <main className="flex-1 flex flex-col overflow-hidden max-w-5xl w-full mx-auto">
        <ChatWindow />
        <ChatInput />
      </main>
    </motion.div>
  );
};

export default Index;

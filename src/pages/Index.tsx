
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import ChatWindow from '@/components/ChatWindow';
import ChatInput from '@/components/ChatInput';
import ModelComparison from '@/components/ModelComparison';
import ProjectBuilder from '@/components/ProjectBuilder';
import ProjectWorkspace from '@/components/ProjectWorkspace';
import { useAI } from '@/context/AIContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Box, Terminal } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import GlowingOrbs from '@/components/GlowingOrbs';

const Index = () => {
  const { webSearchEnabled, appBuildingEnabled, multiModelEnabled } = useAI();
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState<'chat' | 'projects' | 'workspace'>('chat');
  
  useEffect(() => {
    // Set page title
    document.title = "BIRXUO | AI Terminal";
  }, []);

  const handleOpenProjectBuilder = () => {
    setIsProjectDialogOpen(true);
  };

  return (
    <div className="flex flex-col h-screen bg-[#1a1a1a] text-white overflow-y-auto relative">
      <AnimatedBackground />
      <GlowingOrbs />
      
      <Header />
      
      {multiModelEnabled && <ModelComparison />}
      
      <main className="flex-1 flex flex-col overflow-hidden w-full mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs value={activeWorkspace} onValueChange={(value) => setActiveWorkspace(value as any)} className="flex-1 flex flex-col">
            <div className="border-b border-gray-800 px-4">
              <TabsList className="bg-transparent h-12">
                <TabsTrigger value="chat" className="data-[state=active]:bg-gray-800 flex items-center transition-all">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat
                </TabsTrigger>
                <TabsTrigger value="projects" className="data-[state=active]:bg-gray-800 flex items-center transition-all">
                  <Box className="w-4 h-4 mr-2" />
                  Projects
                </TabsTrigger>
                <TabsTrigger value="workspace" className="data-[state=active]:bg-gray-800 flex items-center transition-all">
                  <Terminal className="w-4 h-4 mr-2" />
                  Workspace
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="chat" className="flex-1 flex flex-col mt-0">
              <ChatWindow />
              <ChatInput onOpenProjectBuilder={handleOpenProjectBuilder} />
            </TabsContent>

            <TabsContent value="projects" className="flex-1 mt-0 p-6 overflow-auto">
              <ProjectBuilder />
            </TabsContent>

            <TabsContent value="workspace" className="flex-1 mt-0">
              <ProjectWorkspace />
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      {/* Project Builder Dialog */}
      <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
        <DialogContent className="sm:max-w-6xl sm:max-h-[90vh] bg-[#1a1a1a] border-gray-800 p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>Project Builder</DialogTitle>
          </DialogHeader>
          <div className="p-6 pt-0 overflow-auto max-h-[80vh]">
            <ProjectBuilder />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;

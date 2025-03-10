import React from 'react';
import { Trash2, Terminal, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import APIKeyDialog from './APIKeyDialog';
import { useAI } from '@/context/AIContext';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { motion } from 'framer-motion';
const Header: React.FC = () => {
  const {
    clearMessages,
    messages
  } = useAI();
  const {
    toast
  } = useToast();
  const handleClearChat = () => {
    clearMessages();
    toast({
      title: "Terminal Cleared",
      description: "All communication logs have been purged"
    });
  };
  return <motion.header initial={{
    opacity: 0,
    y: -20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.3
  }} className="sticky top-0 z-10 backdrop-blur-lg bg-background/80 border-b border-primary/20 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <motion.div initial={{
          scale: 0.9
        }} animate={{
          scale: 1
        }} transition={{
          duration: 0.3,
          delay: 0.1
        }}>
            <Link to="/" className="flex items-center space-x-2">
              <Terminal className="h-5 w-5 text-primary" />
              <span className="font-bold tracking-wider text-xl text-primary animate-text-glitch terminal-text">
                BIRXUO
              </span>
            </Link>
          </motion.div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30 terminal-text">DeepSeek 70B Model</span>
        </div>
        <div className="flex items-center space-x-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" disabled={messages.length === 0} className="text-primary hover:text-primary/80 hover:bg-primary/10">
                <Trash2 className="h-5 w-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="glass-panel border-primary/30">
              <AlertDialogHeader>
                <AlertDialogTitle className="terminal-text">Clear Communication Logs?</AlertDialogTitle>
                <AlertDialogDescription className="text-foreground/70">
                  This will remove all messages from the current session. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-background border-primary/30 text-foreground hover:bg-background/80">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearChat} className="bg-primary text-primary-foreground hover:bg-primary/80">Clear</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <APIKeyDialog />
        </div>
      </div>
    </motion.header>;
};
export default Header;
import React from 'react';
import { Trash2, Terminal, Cpu, Zap, Sparkles, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import APIKeyDialog from './APIKeyDialog';
import { useAI } from '@/context/AIContext';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import LoginButton from './LoginButton';
import StatusIndicator from './StatusIndicator';

const Header: React.FC = () => {
  const {
    clearMessages,
    messages,
    selectedModel,
    availableModels,
    isLoading
  } = useAI();
  const {
    user
  } = useAuth();
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

  // Get the current model name for display
  const currentModel = availableModels.find(m => m.id === selectedModel)?.name || 'AI';
  return <motion.header initial={{
    opacity: 0,
    y: -20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.3
  }} className="sticky top-0 z-50 backdrop-blur-xl border-b border-primary/30 p-4 shadow-xl shadow-primary/10 bg-gradient-to-r from-[#1a1a1a]/90 via-[#1a1a1a]/85 to-[#1a1a1a]/90 relative overflow-hidden">
      {/* Enhanced background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50"></div>
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-0 right-1/4 w-24 h-24 bg-primary/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <motion.div initial={{
          scale: 0.9
        }} animate={{
          scale: 1
        }} transition={{
          duration: 0.3,
          delay: 0.1
        }} whileHover={{
          scale: 1.05
        }} className="transition-all">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <Terminal className="h-6 w-6 text-primary group-hover:opacity-0 transition-opacity duration-300" />
                <Zap className="h-6 w-6 text-primary absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="font-bold tracking-wider text-xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/90 to-primary/70 group-hover:from-purple-400 group-hover:to-pink-600 transition-all duration-300">
                BIRXUO
              </span>
            </Link>
          </motion.div>
          <div className="flex items-center space-x-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-xs px-3 py-1 rounded-full bg-primary/15 text-primary border border-primary/30 terminal-text flex items-center shadow-sm shadow-primary/10">
                <Cpu className="h-3 w-3 mr-1" />
                {currentModel}
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-xs px-3 py-1 rounded-full bg-primary/5 text-primary/80 border border-primary/20 terminal-text hidden sm:inline-flex items-center shadow-sm shadow-primary/5">
                <Sparkles className="h-3 w-3 mr-1" />
                Uncensored
              </span>
            </motion.div>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <StatusIndicator status="loading" size="sm" />
              </motion.div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" disabled={messages.length === 0} className="text-primary hover:text-primary/80 hover:bg-primary/10 transition-all duration-200">
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
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <APIKeyDialog />
          </motion.div>
          {/* User profile icon */}
          <Popover>
            <PopoverTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                  <Avatar className="h-8 w-8 border border-primary/30 hover:border-primary/60 transition-colors">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user ? user.email?.charAt(0).toUpperCase() : <UserRound className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </motion.div>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-56 mt-1 p-2 bg-[#1a1a1a] border-gray-800">
              <div className="space-y-2">
                {user ? <>
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{user.email}</p>
                      <p className="text-xs text-muted-foreground">Logged in</p>
                    </div>
                    <Link to="/profile">
                      <Button variant="ghost" className="w-full justify-start text-sm">
                        <UserRound className="h-4 w-4 mr-2" />
                        Profile
                      </Button>
                    </Link>
                    <LoginButton variant="ghost" className="w-full justify-start text-sm">
                      Sign out
                    </LoginButton>
                  </> : <div className="space-y-1">
                    <Link to="/login">
                      <Button variant="default" className="w-full text-sm mb-1">Sign In</Button>
                    </Link>
                    <Link to="/register">
                      <Button variant="outline" className="w-full text-sm">Create Account</Button>
                    </Link>
                  </div>}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </motion.header>;
};
export default Header;

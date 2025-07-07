
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AlertTriangle, Terminal } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background matrix-bg p-4">
      <div className="scan-line"></div>
      
      <motion.div 
        className="glass-panel p-8 max-w-md text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-6">
          <AlertTriangle className="h-16 w-16 text-primary animate-pulse" />
        </div>
        
        <h1 className="text-6xl font-light mb-4 terminal-text animate-text-glitch">404</h1>
        <div className="h-8 my-4 terminal-text text-foreground/80 animate-text-glitch">
          ACCESS_DENIED
          <span className="cursor-blink">_</span>
        </div>
        <p className="text-xl text-foreground/70 mb-6 terminal-text">
          The requested resource does not exist
        </p>
        
        <Button asChild className="rounded glowing-border hover:bg-primary/20 mt-4">
          <a href="/">
            <Terminal className="mr-2 h-4 w-4" />
            Return to Terminal
          </a>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;

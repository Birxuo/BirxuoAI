
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, Lightbulb, ArrowRight, Cpu, Network, Database, Code2 } from 'lucide-react';

interface ThoughtStep {
  id: number;
  title: string;
  content: string;
  icon: React.ReactNode;
  duration: number;
}

const enhancedThoughts: ThoughtStep[] = [
  {
    id: 1,
    title: "Neural Network Initialization",
    content: "Activating BIRXUO Z1 671b neural pathways and loading contextual embeddings...",
    icon: <Brain className="h-4 w-4" />,
    duration: 1200
  },
  {
    id: 2,
    title: "Query Analysis & Parsing",
    content: "Decomposing user intent using advanced NLP transformers and semantic understanding...",
    icon: <Code2 className="h-4 w-4" />,
    duration: 800
  },
  {
    id: 3,
    title: "Knowledge Graph Traversal",
    content: "Accessing distributed knowledge base with quantum-resistant encryption protocols...",
    icon: <Database className="h-4 w-4" />,
    duration: 1000
  },
  {
    id: 4,
    title: "Multi-Modal Processing",
    content: "Synthesizing information across text, code, and contextual domains...",
    icon: <Network className="h-4 w-4" />,
    duration: 900
  },
  {
    id: 5,
    title: "Response Generation",
    content: "Crafting optimized response using advanced reasoning and validation systems...",
    icon: <Lightbulb className="h-4 w-4" />,
    duration: 700
  }
];

const processingStates = [
  "Initializing secure communication channels...",
  "Calibrating response quality parameters...",
  "Verifying information accuracy and relevance...",
  "Optimizing for user comprehension level...",
  "Applying ethical reasoning frameworks...",
  "Cross-referencing with latest knowledge updates...",
  "Ensuring factual consistency and coherence...",
  "Personalizing response tone and style...",
  "Implementing real-time safety checks...",
  "Finalizing structured output format..."
];

const AIThoughtProcess: React.FC = () => {
  const [activeThoughtIndex, setActiveThoughtIndex] = useState(0);
  const [visibleThoughts, setVisibleThoughts] = useState<ThoughtStep[]>([]);
  const [currentSubProcess, setCurrentSubProcess] = useState("");
  const [processingProgress, setProcessingProgress] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const processNextThought = () => {
      if (activeThoughtIndex < enhancedThoughts.length) {
        const currentThought = enhancedThoughts[activeThoughtIndex];
        
        // Add current thought to visible list
        setVisibleThoughts(prev => {
          if (!prev.some(t => t.id === currentThought.id)) {
            return [...prev, currentThought];
          }
          return prev;
        });

        // Update sub-process
        const randomSubProcess = processingStates[Math.floor(Math.random() * processingStates.length)];
        setCurrentSubProcess(randomSubProcess);

        // Update progress
        setProcessingProgress((activeThoughtIndex + 1) / enhancedThoughts.length * 100);

        // Schedule next thought
        timeoutId = setTimeout(() => {
          setActiveThoughtIndex(prev => prev + 1);
        }, currentThought.duration);
      } else {
        setIsCompleting(true);
        setCurrentSubProcess("Response generation complete. Delivering optimized output...");
      }
    };

    processNextThought();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [activeThoughtIndex]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-panel p-6 space-y-6 max-w-4xl mx-auto my-6 bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 border border-white/10"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Cpu className="text-primary h-6 w-6" />
          </motion.div>
          <h3 className="text-primary font-semibold text-lg">BIRXUO AI Neural Processing</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="text-xs text-foreground/60">Progress:</div>
          <div className="w-24 h-2 bg-black/50 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary/60 to-primary"
              initial={{ width: 0 }}
              animate={{ width: `${processingProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="text-xs text-primary font-mono">{Math.round(processingProgress)}%</div>
        </div>
      </div>
      
      <div className="space-y-4">
        <AnimatePresence>
          {visibleThoughts.map((thought, index) => (
            <motion.div
              key={thought.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`border rounded-lg p-4 transition-all duration-500 ${
                index === activeThoughtIndex 
                  ? 'border-primary/50 bg-primary/5 shadow-lg shadow-primary/20' 
                  : index < activeThoughtIndex
                  ? 'border-green-500/30 bg-green-500/5'
                  : 'border-white/20 bg-black/20'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <motion.div
                  animate={index === activeThoughtIndex ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  } : {}}
                  transition={{ duration: 1, repeat: index === activeThoughtIndex ? Infinity : 0 }}
                  className={`p-2 rounded-lg ${
                    index === activeThoughtIndex 
                      ? 'bg-primary/20 text-primary' 
                      : index < activeThoughtIndex
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-white/10 text-white/60'
                  }`}
                >
                  {thought.icon}
                </motion.div>
                
                <div className="flex-1">
                  <h4 className={`font-medium ${
                    index === activeThoughtIndex 
                      ? 'text-primary' 
                      : index < activeThoughtIndex
                      ? 'text-green-400'
                      : 'text-foreground/80'
                  }`}>
                    {thought.title}
                  </h4>
                  
                  {index === activeThoughtIndex && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center space-x-2 mt-1"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full"
                      />
                      <span className="text-xs text-primary/80">Processing...</span>
                    </motion.div>
                  )}
                </div>
                
                {index < activeThoughtIndex && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-green-400"
                  >
                    <Zap className="h-4 w-4" />
                  </motion.div>
                )}
              </div>
              
              <p className="text-sm text-foreground/70 ml-11">{thought.content}</p>
              
              {index === activeThoughtIndex && currentSubProcess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="ml-11 mt-3 flex items-start space-x-2"
                >
                  <ArrowRight className="h-3 w-3 text-primary/60 mt-0.5 flex-shrink-0" />
                  <motion.span 
                    className="text-xs text-primary/80 font-mono"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {currentSubProcess}
                  </motion.span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isCompleting && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-primary/30 rounded-lg p-4 bg-gradient-to-r from-primary/10 to-transparent"
          >
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="p-2 rounded-lg bg-primary/20"
              >
                <Lightbulb className="h-4 w-4 text-primary" />
              </motion.div>
              <div>
                <h4 className="font-medium text-primary">Neural Processing Complete</h4>
                <p className="text-sm text-foreground/70 mt-1">
                  BIRXUO has analyzed your request and generated an optimized response using advanced AI reasoning.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AIThoughtProcess;

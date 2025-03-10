
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, Lightbulb, ArrowRight } from 'lucide-react';

interface ThoughtStep {
  id: number;
  title: string;
  content: string;
}

const initialThoughts: ThoughtStep[] = [
  {
    id: 1,
    title: "Processing Query",
    content: "Analyzing input and extracting key components to understand the user's intent..."
  },
  {
    id: 2,
    title: "Retrieving Information",
    content: "Accessing knowledge base and gathering relevant information to form a comprehensive response..."
  },
  {
    id: 3,
    title: "Considering Alternatives",
    content: "Evaluating multiple potential responses and selecting the most relevant and accurate information..."
  },
  {
    id: 4,
    title: "Formulating Response",
    content: "Structuring information and crafting a clear, coherent response that addresses the query..."
  }
];

const randomThoughts = [
  "Examining context and previous messages for continuity...",
  "Prioritizing information based on relevance to query...",
  "Checking factual accuracy and reliability of information...",
  "Ensuring response is helpful and addresses the core question...",
  "Evaluating ethical considerations and potential implications...",
  "Calibrating language style to match conversational context...",
  "Organizing information in a logical, comprehensible sequence...",
  "Generating examples to illustrate concepts clearly...",
  "Determining appropriate level of detail for response...",
  "Connecting related concepts to provide comprehensive understanding..."
];

const AIThoughtProcess: React.FC = () => {
  const [activeThoughtIndex, setActiveThoughtIndex] = useState(0);
  const [visibleThoughts, setVisibleThoughts] = useState<ThoughtStep[]>([]);
  const [textGeneration, setTextGeneration] = useState("");
  const [subThoughts, setSubThoughts] = useState<string[]>([]);
  
  // Simulate thought process progression
  useEffect(() => {
    const interval = setInterval(() => {
      // Progress through main thought steps
      if (activeThoughtIndex < initialThoughts.length) {
        // Add thought step if not already in visible thoughts
        if (!visibleThoughts.some(t => t.id === initialThoughts[activeThoughtIndex].id)) {
          setVisibleThoughts(prev => [...prev, initialThoughts[activeThoughtIndex]]);
        }
        
        // Generate sub-thoughts for current main thought
        if (Math.random() > 0.5 && subThoughts.length < 3) {
          const randomThought = randomThoughts[Math.floor(Math.random() * randomThoughts.length)];
          if (!subThoughts.includes(randomThought)) {
            setSubThoughts(prev => [...prev, randomThought]);
          }
        }
        
        // Move to next thought after some time
        if (Math.random() > 0.7) {
          setActiveThoughtIndex(prev => Math.min(prev + 1, initialThoughts.length - 1));
        }
      } else {
        // Focus on text generation
        const words = [
          "The", "AI", "model", "is", "carefully", "constructing", "a", "response", 
          "based", "on", "the", "information", "gathered", "and", "processed", 
          "ensuring", "accuracy", "and", "relevance", "to", "your", "query"
        ];
        
        if (textGeneration.split(" ").length < words.length) {
          const nextWordIndex = textGeneration.split(" ").length;
          setTextGeneration(prev => prev + (prev ? " " : "") + words[nextWordIndex]);
        }
      }
    }, 800);

    return () => clearInterval(interval);
  }, [activeThoughtIndex, visibleThoughts, textGeneration, subThoughts]);

  return (
    <motion.div 
      className="glass-panel p-4 space-y-4 max-w-3xl mx-auto my-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-2 mb-2">
        <Brain className="text-primary h-6 w-6" />
        <h3 className="text-primary font-semibold terminal-text">BIRXUO AI Thought Process</h3>
      </div>
      
      <div className="space-y-4">
        <AnimatePresence>
          {visibleThoughts.map((thought, index) => (
            <motion.div
              key={thought.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`border ${index === activeThoughtIndex ? 'border-primary/50' : 'border-primary/20'} 
                rounded-md p-3 ${index === activeThoughtIndex ? 'bg-primary/10' : ''}`}
            >
              <div className="flex items-center space-x-2">
                {index === activeThoughtIndex ? (
                  <Zap className="h-4 w-4 text-primary animate-pulse" />
                ) : (
                  <div className="h-4 w-4 rounded-full bg-primary/30 flex items-center justify-center text-xs">
                    {thought.id}
                  </div>
                )}
                <h4 className={`font-medium ${index === activeThoughtIndex ? 'text-primary' : 'text-foreground/80'}`}>
                  {thought.title}
                </h4>
              </div>
              
              <p className="mt-1 text-sm text-foreground/60 ml-6">{thought.content}</p>
              
              {index === activeThoughtIndex && (
                <div className="ml-6 mt-2 space-y-2">
                  <AnimatePresence>
                    {subThoughts.map((subThought, subIndex) => (
                      <motion.div
                        key={subIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-start space-x-2 text-xs text-foreground/50"
                      >
                        <ArrowRight className="h-3 w-3 mt-0.5 text-primary/60" />
                        <span>{subThought}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {activeThoughtIndex === initialThoughts.length - 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="border border-primary/30 rounded-md p-3 mt-4"
          >
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-4 w-4 text-primary" />
              <h4 className="font-medium text-primary">Generating Response</h4>
            </div>
            
            <div className="mt-3 pl-6 border-l border-primary/20">
              <motion.div
                className="text-sm text-foreground/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="terminal-text">{textGeneration}</span>
                <span className="inline-block w-2 h-4 bg-primary/70 ml-1 animate-pulse"></span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AIThoughtProcess;

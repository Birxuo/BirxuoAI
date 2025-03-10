
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal, Shield, Code, Zap, ChevronRight, Lock, Cpu, BarChart, Brain, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    title: "Advanced Intelligence",
    description: "Powered by DeepSeek's 70B model, one of the most sophisticated AI systems available.",
    icon: <Brain className="h-6 w-6" />
  },
  {
    title: "Secure Communication",
    description: "All conversations are processed with top-tier, end-to-end encryption, ensuring no data is collected.",
    icon: <Shield className="h-6 w-6" />
  },
  {
    title: "Technical Prowess",
    description: "Specialized in technical subjects, programming, and complex problem-solving.",
    icon: <Code className="h-6 w-6" />
  },
  {
    title: "Lightning Fast",
    description: "Optimized for speed, delivering responses with minimal latency.",
    icon: <Zap className="h-6 w-6" />
  },
  {
    title: "Deep Analysis",
    description: "Performs thorough analysis of complex data and scenarios to provide comprehensive insights.",
    icon: <BarChart className="h-6 w-6" />
  },
  {
    title: "Advanced Processing",
    description: "Utilizes cutting-edge computational techniques to handle sophisticated requests.",
    icon: <Cpu className="h-6 w-6" />
  }
];

// Testimonials array removed

const Landing: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const textToType = 'SECURE_CONNECTION_ESTABLISHED...';
  const featuresRef = useRef<HTMLDivElement>(null);
  
  // Typing animation effect
  useEffect(() => {
    if (typedText.length < textToType.length) {
      const timeout = setTimeout(() => {
        setTypedText(textToType.substring(0, typedText.length + 1));
      }, Math.random() * 150 + 50);
      
      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  return (
    <div className="min-h-screen flex flex-col matrix-bg">
      <div className="scan-line"></div>
      
      <header className="border-b border-primary/20 py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <Lock className="text-primary h-5 w-5" />
            <span className="text-lg font-medium terminal-text animate-text-glitch">BIRXUO</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Button asChild size="sm" className="rounded glowing-border hover:bg-primary/20">
              <Link to="/chat">
                Launch Terminal <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-4"
            >
              <h1 className="text-4xl md:text-6xl font-bold terminal-text mb-4">
                <span className="text-primary animate-text-glitch">BIRXUO</span>
                <span className="text-foreground/70"> AI</span>
              </h1>
              
              <p className="text-xl text-foreground/70 terminal-text max-w-2xl mx-auto">
                Advanced intelligence system for secure communications and complex problem-solving
              </p>
              
              <div className="h-8 my-6 terminal-text text-foreground/80">
                {typedText}
                <span className="cursor-blink">_</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button asChild size="lg" className="rounded-md text-lg glowing-border hover:bg-primary/20 w-full sm:w-auto">
                <Link to="/chat">
                  Initialize Conversation <Terminal className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-md text-lg border-primary/40 hover:bg-primary/10 w-full sm:w-auto"
                onClick={() => featuresRef.current?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Capabilities <Eye className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Visual separator */}
        <div className="w-full max-w-5xl mx-auto px-4">
          <motion.div 
            className="border-t border-primary/30"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
        </div>

        {/* Features Section */}
        <section ref={featuresRef} className="py-16 container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-semibold text-center mb-12 terminal-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-primary">Advanced</span> Capabilities
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="glass-panel p-6 space-y-4 hover:shadow-[0_0_20px_rgba(0,255,0,0.2)] transition-all duration-300"
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 0 25px rgba(0,255,0,0.3)"
                }}
              >
                <div className="text-primary mb-2">{feature.icon}</div>
                <h3 className="text-lg font-semibold terminal-text">{feature.title}</h3>
                <p className="text-foreground/70 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials Section removed */}

        {/* CTA Section */}
        <section className="py-20 container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto glass-panel p-10 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-semibold mb-6 terminal-text">Ready to <span className="text-primary">Experience</span> BIRXUO AI?</h2>
            <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
              Access advanced intelligence capabilities with our secure terminal interface. 
              No data collection, end-to-end encryption, and unparalleled performance.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button asChild size="lg" className="rounded-md text-lg glowing-border hover:bg-primary/20">
                <Link to="/chat">
                  Open Secure Terminal <Terminal className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-primary/20 py-8">
        <div className="container mx-auto text-center text-foreground/50 text-sm px-4">
          <motion.p 
            className="terminal-text mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            BIRXUO AI · Secure Intelligence Interface
          </motion.p>
          <motion.p 
            className="text-xs"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            End-to-end encryption · Zero data collection · Advanced intelligence
          </motion.p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Github, LogIn, UserPlus, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EnhancedGridBackground from '@/components/EnhancedGridBackground';
import HeroSection from '@/components/HeroSection';
import FeatureShowcase from '@/components/FeatureShowcase';
import ProductDemo from '@/components/ProductDemo';
import CallToAction from '@/components/CallToAction';
import VizCode from '@/components/VizCode';
import { useAuth } from '@/context/AuthContext';
import ParticlesBackground from '@/components/ParticlesBackground';
import FloatingShapes from '@/components/FloatingShapes';
import AnimatedBackground from '@/components/AnimatedBackground';
import GlowingOrbs from '@/components/GlowingOrbs';
import InteractiveParticles from '@/components/InteractiveParticles';

const Landing: React.FC = () => {
  const {
    user
  } = useAuth();
  
  useEffect(() => {
    // Set page title
    document.title = "BIRXUO | Advanced AI System";

    // Scroll to top on load
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col relative bg-black text-white overflow-hidden">
      <EnhancedGridBackground />
      <ParticlesBackground />
      <AnimatedBackground />
      <GlowingOrbs />
      <InteractiveParticles />
      
      <header className="py-5 sticky top-0 z-50 backdrop-blur-xl bg-black/70 border-b border-white/5">
        <div className="container mx-auto flex justify-between items-center px-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }} 
            className="flex items-center gap-2"
          >
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.span 
                className="text-lg font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70 group-hover:from-purple-400 group-hover:to-pink-600 transition-all duration-300"
                whileHover={{ textShadow: "0 0 8px rgba(255,255,255,0.8)" }}
              >
                BIRXUO
              </motion.span>
              <motion.span 
                className="bg-gradient-to-r from-purple-400 to-pink-600 h-1.5 w-0 group-hover:w-full transition-all duration-300 rounded-full"
                whileHover={{ boxShadow: "0 0 8px rgba(255,255,255,0.8)" }}
              />
            </Link>
          </motion.div>
          
          <motion.nav 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.2, duration: 0.5 }} 
            className="hidden md:flex gap-8 items-center"
          >
            <motion.a 
              href="#features" 
              className="text-sm text-white/70 hover:text-white transition-colors relative"
              whileHover={{ scale: 1.05 }}
            >
              Features
              <motion.span
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/30"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link 
                to="/docs" 
                className="text-sm flex items-center text-white/70 hover:text-white transition-colors relative"
              >
                Documentation
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/30"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </motion.nav>
          
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.3, duration: 0.5 }} 
            className="flex gap-4 items-center"
          >
            <motion.a 
              href="https://github.com/BIRXUO/BIRXUO" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="text-white/80 hover:text-white transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </motion.a>
            
            {user ? (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  asChild 
                  size="sm" 
                  variant="outline" 
                  className="rounded-md border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 enhanced-button"
                >
                  <Link to="/chat">
                    Launch App <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            ) : (
              <div className="flex gap-2">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    asChild 
                    size="sm" 
                    variant="outline" 
                    className="rounded-md border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 enhanced-button"
                  >
                    <Link to="/login">
                      <LogIn className="mr-1 h-4 w-4" />
                      Sign In
                    </Link>
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    asChild 
                    size="sm" 
                    className="rounded-md bg-white text-black hover:bg-white/90 enhanced-button"
                  >
                    <Link to="/register">
                      <UserPlus className="mr-1 h-4 w-4" />
                      Sign Up
                    </Link>
                  </Button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        <div className="relative">
          <FloatingShapes />
          <HeroSection />
        </div>
        
        <div id="features">
          <FeatureShowcase />
        </div>
        
        <VizCode />
        
        <div id="demo">
          <ProductDemo />
        </div>
        
        <CallToAction />
      </main>

      <footer className="py-16 border-t border-white/5 bg-black relative overflow-hidden z-10">
        <div className="absolute inset-0 data-grid opacity-30 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <motion.div 
              className="space-y-4" 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              viewport={{ once: true }}
            >
              <div className="text-xl font-semibold shimmer-text">BIRXUO</div>
              <p className="text-sm text-white/50 max-w-xs">
                Advanced AI system with end-to-end encryption and unparalleled performance.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.1 }} 
              className="space-y-4"
            >
              <div className="text-sm font-semibold text-white/80 glowing-dot">Product</div>
              <ul className="space-y-3">
                <li>
                  <motion.a 
                    href="#" 
                    className="text-sm text-white/50 hover:text-white transition-colors inline-block"
                    whileHover={{ x: 5 }}
                  >
                    Features
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="#" 
                    className="text-sm text-white/50 hover:text-white transition-colors inline-block"
                    whileHover={{ x: 5 }}
                  >
                    Security
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="#" 
                    className="text-sm text-white/50 hover:text-white transition-colors inline-block"
                    whileHover={{ x: 5 }}
                  >
                    Enterprise
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="#" 
                    className="text-sm text-white/50 hover:text-white transition-colors inline-block"
                    whileHover={{ x: 5 }}
                  >
                    Pricing
                  </motion.a>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.2 }} 
              className="space-y-4"
            >
              <div className="text-sm font-semibold text-white/80 glowing-dot">Resources</div>
              <ul className="space-y-3">
                <li>
                  <motion.div whileHover={{ x: 5 }} className="inline-block">
                    <Link to="/docs" className="text-sm text-white/50 hover:text-white transition-colors">
                      Documentation
                    </Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={{ x: 5 }} className="inline-block">
                    <Link to="/docs#guides" className="text-sm text-white/50 hover:text-white transition-colors">
                      Guides
                    </Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={{ x: 5 }} className="inline-block">
                    <Link to="/docs#api-reference" className="text-sm text-white/50 hover:text-white transition-colors">
                      API Reference
                    </Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={{ x: 5 }} className="inline-block">
                    <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">
                      Blog
                    </a>
                  </motion.div>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.3 }} 
              className="space-y-4"
            >
              <div className="text-sm font-semibold text-white/80 glowing-dot">Company</div>
              <ul className="space-y-3">
                <li>
                  <motion.div whileHover={{ x: 5 }} className="inline-block">
                    <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">
                      About
                    </a>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={{ x: 5 }} className="inline-block">
                    <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">
                      Contact
                    </a>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={{ x: 5 }} className="inline-block">
                    <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">
                      Privacy
                    </a>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={{ x: 5 }} className="inline-block">
                    <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">
                      Terms
                    </a>
                  </motion.div>
                </li>
              </ul>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center animated-border" 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.4 }}
          >
            <div className="text-sm text-white/40 mb-4 md:mb-0">© 2025 BIRXUO. All rights reserved.</div>
            
            <div className="text-xs text-white/40">End-to-end encryption · Zero data collection · Powered by BIRXUOGROUP</div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

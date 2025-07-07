
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, LogIn, UserPlus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const CallToAction: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
      
      {/* Animated noise pattern */}
      <div className="absolute inset-0">
        <NoisePatternAnimation />
      </div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-xl border border-white/10 p-10 md:p-16 backdrop-blur-sm bg-gradient-to-b from-black/60 to-black/30 glow-border relative overflow-hidden"
          style={{
            boxShadow: '0 0 15px rgba(255,255,255,0.1), 0 0 30px rgba(255,255,255,0.05)'
          }}
        >
          {/* Animated lines */}
          <motion.div className="absolute inset-0 pointer-events-none opacity-10">
            <AnimatedLines />
          </motion.div>
          
          <div className="max-w-3xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6"
            >
              <Sparkles className="h-4 w-4 mr-2 text-white" />
              <span className="text-sm text-white/80">Join the AI revolution</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              <motion.span 
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white text-shadow-white"
              >
                Get Started with BIRXUO Today
              </motion.span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="text-foreground/70 mb-10 text-lg"
            >
              Experience one of the most sophisticated AI systems available, with end-to-end encryption, 
              zero data collection, and unparalleled performance.
            </motion.p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="shine-effect"
                >
                  <Button asChild size="lg" className="rounded-md text-lg bg-white hover:bg-white/90 text-black border-0 shadow-lg w-full sm:w-auto neon-button">
                    <Link to="/chat">
                      Start for Free <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
              ) : (
                <>
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="shine-effect"
                  >
                    <Button asChild size="lg" className="rounded-md text-lg bg-white hover:bg-white/90 text-black border-0 shadow-lg w-full sm:w-auto neon-button">
                      <Link to="/register">
                        <UserPlus className="mr-2 h-5 w-5" />
                        Sign Up Free
                      </Link>
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Button asChild size="lg" variant="outline" className="rounded-md text-lg border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/30 w-full sm:w-auto neon-outline-button">
                      <Link to="/login">
                        <LogIn className="mr-2 h-5 w-5" />
                        Sign In
                      </Link>
                    </Button>
                  </motion.div>
                </>
              )}
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="text-foreground/50 text-sm mt-8"
            >
              No credit card required • Free personal tier • Enterprise solutions available
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Animated lines component
const AnimatedLines = () => {
  return (
    <div className="w-full h-full">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-white/10"
          style={{
            left: 0,
            right: 0,
            top: `${(i + 1) * 12.5}%`,
            scaleX: 0,
            originX: i % 2 === 0 ? 0 : 1
          }}
          animate={{
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: i * 0.2,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Noise pattern animation
const NoisePatternAnimation = () => {
  return (
    <div className="w-full h-full">
      <svg width="100%" height="100%" className="opacity-5">
        <filter id="noise">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.65" 
            numOctaves="3" 
            stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
};

export default CallToAction;

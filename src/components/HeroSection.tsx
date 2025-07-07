import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, LogIn, UserPlus, Sparkles, Zap, Brain, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
const HeroSection: React.FC = () => {
  const {
    user
  } = useAuth();
  return <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(50,50,50,0.2),rgba(0,0,0,0))] pointer-events-none"></div>
      <div className="absolute top-10 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full -z-10" />
      
      {/* Enhanced animated neon lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top scanning line */}
        <motion.div className="absolute top-[20%] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" style={{
        boxShadow: '0 0 10px rgba(255,255,255,0.6), 0 0 20px rgba(255,255,255,0.3)',
        filter: 'blur(0.5px)'
      }} animate={{
        opacity: [0.3, 0.8, 0.3],
        width: ['0%', '100%', '0%'],
        left: ['0%', '0%', '100%']
      }} transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut'
      }} />
        
        {/* Bottom scanning line */}
        <motion.div className="absolute top-[80%] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" style={{
        boxShadow: '0 0 10px rgba(255,255,255,0.6), 0 0 20px rgba(255,255,255,0.3)',
        filter: 'blur(0.5px)'
      }} animate={{
        opacity: [0.3, 0.8, 0.3],
        width: ['0%', '100%', '0%'],
        left: ['100%', '0%', '0%']
      }} transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
        delay: 4
      }} />
        
        {/* Vertical scanning lines */}
        <motion.div className="absolute left-[25%] top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-primary/40 to-transparent" style={{
        boxShadow: '0 0 8px rgba(255,255,255,0.4)',
        filter: 'blur(0.5px)'
      }} animate={{
        opacity: [0.2, 0.6, 0.2],
        height: ['0%', '100%', '0%']
      }} transition={{
        duration: 6,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
        delay: 1
      }} />
        
        <motion.div className="absolute right-[25%] top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-primary/40 to-transparent" style={{
        boxShadow: '0 0 8px rgba(255,255,255,0.4)',
        filter: 'blur(0.5px)'
      }} animate={{
        opacity: [0.2, 0.6, 0.2],
        height: ['0%', '100%', '0%']
      }} transition={{
        duration: 6,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
        delay: 3
      }} />
      </div>
      
      <div className="max-w-6xl mx-auto px-4 z-10 relative">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.7
      }} className="text-center space-y-6 max-w-4xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.5
        }} className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 mb-4" style={{
          boxShadow: '0 0 20px rgba(255,255,255,0.1)'
        }}>
            <motion.div animate={{
            rotate: [0, 360]
          }} transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}>
              <Sparkles className="h-4 w-4 mr-2 text-primary" />
            </motion.div>
            <span className="text-sm text-primary font-medium">Next-Generation AI Platform</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
            <motion.span initial={{
            backgroundPosition: '0% 50%'
          }} animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }} transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }} className="bg-clip-text text-transparent bg-gradient-to-r from-white via-primary/80 to-white" style={{
            backgroundSize: '200% 100%',
            textShadow: '0 0 30px rgba(255,255,255,0.3)'
          }}>
              Built by Engineers
            </motion.span>
            <br />
            <motion.span initial={{
            backgroundPosition: '100% 50%'
          }} animate={{
            backgroundPosition: ['100% 50%', '0% 50%', '100% 50%']
          }} transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }} className="bg-clip-text text-transparent bg-gradient-to-r from-primary/80 via-white to-primary/80" style={{
            backgroundSize: '200% 100%',
            textShadow: '0 0 30px rgba(255,255,255,0.3)'
          }}>
              For Engineers
            </motion.span>
          </h1>
          
          <motion.p initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="text-foreground/80 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            BIRXUO is a cutting-edge AI platform featuring advanced reasoning models, 
            end-to-end encryption, and zero data collection. Experience the future of AI assistance.
          </motion.p>
          
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.8,
          delay: 0.3
        }} className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            {user ? <motion.div whileHover={{
            scale: 1.05,
            y: -2
          }} whileTap={{
            scale: 0.95
          }} className="shine-effect">
                <Button asChild size="lg" className="rounded-xl text-lg px-8 py-4 bg-white hover:bg-white/90 text-black border-0 shadow-xl font-semibold">
                  <Link to="/chat" className="flex items-center">
                    <Zap className="mr-2 h-5 w-5" />
                    Launch BIRXUO
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div> : <>
                <motion.div whileHover={{
              scale: 1.05,
              y: -2
            }} whileTap={{
              scale: 0.95
            }} className="shine-effect">
                  <Button asChild size="lg" className="rounded-xl text-lg px-8 py-4 bg-white hover:bg-white/90 text-black border-0 shadow-xl font-semibold">
                    <Link to="/register" className="flex items-center">
                      <UserPlus className="mr-2 h-5 w-5" />
                      Get Started Free
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{
              scale: 1.05,
              y: -2
            }} whileTap={{
              scale: 0.95
            }}>
                  <Button asChild size="lg" variant="outline" className="rounded-xl text-lg px-8 py-4 border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/30 font-semibold">
                    <Link to="/login" className="flex items-center">
                      <LogIn className="mr-2 h-5 w-5" />
                      Sign In
                    </Link>
                  </Button>
                </motion.div>
              </>}
          </motion.div>
        </motion.div>
        
        {/* Enhanced terminal preview */}
        <motion.div initial={{
        opacity: 0,
        y: 40
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 1,
        delay: 0.5
      }} className="mt-24 relative">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/20 shadow-2xl">
            {/* Enhanced neon glow effect */}
            <motion.div style={{
            background: 'linear-gradient(45deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1), rgba(255,255,255,0.2))',
            backgroundSize: '400% 400%'
          }} animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }} transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }} className="absolute -inset-[2px] rounded-2xl z-10 bg-transparent" />
            
            {/* Terminal content */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-black">
              {/* Enhanced background effects */}
              <div className="absolute inset-0">
                <motion.div animate={{
                background: ['radial-gradient(circle at 20% 20%, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 50%)', 'radial-gradient(circle at 80% 80%, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 50%)', 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 50%)', 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 50%)', 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 50%)']
              }} transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }} className="w-full h-full absolute" />
                <div className="absolute inset-0 modern-grid opacity-30"></div>
              </div>

              {/* Terminal header */}
              <div className="absolute inset-0 flex flex-col">
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    <motion.div animate={{
                    backgroundColor: ['#ff0000', '#ff0000', '#cccccc']
                  }} transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 5
                  }} className="h-3 w-3 rounded-full bg-red-500" />
                    <motion.div animate={{
                    backgroundColor: ['#ffff00', '#ffff00', '#cccccc']
                  }} transition={{
                    duration: 2,
                    delay: 0.5,
                    repeat: Infinity,
                    repeatDelay: 5
                  }} className="h-3 w-3 rounded-full bg-yellow-500" />
                    <motion.div animate={{
                    backgroundColor: ['#00ff00', '#00ff00', '#cccccc']
                  }} transition={{
                    duration: 2,
                    delay: 1,
                    repeat: Infinity,
                    repeatDelay: 5
                  }} className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Brain className="h-4 w-4 text-primary" />
                    <span className="text-sm text-foreground/60 font-mono">BIRXUO AI Terminal</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Code className="h-4 w-4 text-foreground/40" />
                    <span className="text-xs text-foreground/40">Neural Interface</span>
                  </div>
                </div>
                
                {/* Terminal content */}
                <div className="flex-1 p-6 font-mono text-sm md:text-base">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <motion.span animate={{
                      opacity: [1, 0, 1]
                    }} transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatDelay: 5
                    }} className="text-primary mr-3 font-bold">➜</motion.span>
                      <span className="typing-animation text-white">birxuo --initialize</span>
                    </div>
                    
                    <div className="text-primary/80 pl-6 typing-animation-delay">
                      🧠 Initializing BIRXUO Z1 671b neural network...
                    </div>
                    
                    <div className="text-green-400 pl-6 typing-animation-delay-2">
                      ✓ Quantum-resistant encryption: ACTIVE
                    </div>
                    
                    <div className="text-green-400 pl-6 typing-animation-delay-3">
                      ✓ Zero data collection: VERIFIED
                    </div>
                    
                    <div className="text-primary/80 pl-6 typing-animation-delay-4">
                      🔐 Establishing secure neural pathways...
                    </div>
                    
                    <div className="flex items-center pt-4">
                      <motion.span animate={{
                      opacity: [1, 0, 1]
                    }} transition={{
                      duration: 1,
                      delay: 5,
                      repeat: Infinity,
                      repeatDelay: 5
                    }} className="text-primary mr-3 font-bold">➜</motion.span>
                      <span className="typing-animation-delay-5 text-white">birxuo --query "Help me build something amazing"</span>
                    </div>
                    
                    <div className="text-primary/80 pl-6 typing-animation-delay-6">
                      🚀 Processing with advanced reasoning...
                    </div>
                    
                    <div className="text-white pl-6 typing-animation-delay-7">
                      I'm ready to help you create, analyze, and innovate. 
                      <br />What would you like to build today?
                    </div>
                    
                    <div className="flex items-center pt-2">
                      <motion.span animate={{
                      opacity: [1, 0, 1]
                    }} transition={{
                      duration: 1,
                      delay: 9,
                      repeat: Infinity
                    }} className="text-primary mr-3 font-bold">➜</motion.span>
                      <motion.span className="bg-primary/70 w-3 h-5 inline-block" animate={{
                      opacity: [1, 0, 1]
                    }} transition={{
                      duration: 1,
                      repeat: Infinity
                    }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced floating indicators */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
            {Array.from({
            length: 5
          }).map((_, i) => <motion.div key={i} animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
            y: [0, -10, 0],
            boxShadow: ['0 0 5px rgba(255,255,255,0.3)', '0 0 15px rgba(255,255,255,0.8), 0 0 25px rgba(255,255,255,0.4)', '0 0 5px rgba(255,255,255,0.3)']
          }} transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }} className="w-3 h-3 rounded-full bg-primary" />)}
          </div>

          {/* Enhanced particle effects */}
          <motion.div className="absolute inset-0 pointer-events-none overflow-hidden">
            <EnhancedParticleAnimation />
          </motion.div>
        </motion.div>
      </div>
    </section>;
};

// Enhanced particle animation with more sophisticated effects
const EnhancedParticleAnimation = () => {
  return <div className="absolute inset-0 overflow-hidden">
      {/* Data streams */}
      {Array.from({
      length: 20
    }).map((_, i) => <motion.div key={`stream-${i}`} className="absolute w-px h-20 bg-gradient-to-b from-transparent via-primary/60 to-transparent" style={{
      left: `${Math.random() * 100}%`,
      top: `-20px`
    }} initial={{
      opacity: 0,
      scaleY: 0
    }} animate={{
      y: ['0vh', '120vh'],
      opacity: [0, 1, 1, 0],
      scaleY: [0, 1, 1, 0]
    }} transition={{
      duration: Math.random() * 3 + 2,
      repeat: Infinity,
      delay: Math.random() * 5,
      ease: "linear"
    }} />)}
      
      {/* Floating orbs */}
      {Array.from({
      length: 10
    }).map((_, i) => <motion.div key={`orb-${i}`} className="absolute w-2 h-2 rounded-full bg-primary/40" style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`
    }} animate={{
      x: [0, Math.random() * 200 - 100],
      y: [0, Math.random() * 200 - 100],
      opacity: [0, 1, 0],
      scale: [0, 1, 0]
    }} transition={{
      duration: Math.random() * 8 + 5,
      repeat: Infinity,
      delay: Math.random() * 3,
      ease: "easeInOut"
    }} />)}
    </div>;
};
export default HeroSection;
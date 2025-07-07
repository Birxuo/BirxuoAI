
import React from 'react';
import { motion } from 'framer-motion';

const EnhancedGridBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-black opacity-90">
        <div className="h-full w-full modern-grid"></div>
      </div>
      
      {/* Animated gradients */}
      <motion.div 
        className="absolute top-0 -left-1/4 w-1/2 h-1/2 rounded-full blur-[150px] opacity-30"
        style={{ background: 'linear-gradient(135deg, rgba(100,100,255,0.3), rgba(0,0,0,0))' }}
        animate={{ 
          x: [0, 50, 0], 
          y: [0, 30, 0],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity,
          repeatType: "reverse", 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full blur-[150px] opacity-20"
        style={{ background: 'linear-gradient(135deg, rgba(255,100,100,0.3), rgba(0,0,0,0))' }}
        animate={{ 
          x: [0, -50, 0], 
          y: [0, -30, 0],
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity,
          repeatType: "reverse", 
          ease: "easeInOut",
          delay: 5 
        }}
      />
      
      {/* Animated scan lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
            style={{ top: `${33 * i}%` }}
            animate={{
              y: ["100vh", "-10vh"]
            }}
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2
            }}
          />
        ))}
      </div>
      
      {/* Radial pulse */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-1/3 h-1/3 rounded-full border border-white/5"
          animate={{
            scale: [1, 2, 1],
            opacity: [0, 0.05, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
};

export default EnhancedGridBackground;

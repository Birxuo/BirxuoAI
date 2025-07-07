
import React from 'react';
import { motion } from 'framer-motion';

const GridBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full">
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 modern-grid bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:30px_30px] opacity-20"></div>
      </div>
      <motion.div 
        className="absolute inset-0 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
      >
        {/* Subtle gradient orbs with neon glow */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-[120px] animate-pulse-subtle"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-500/10 to-emerald-500/10 blur-[120px] animate-pulse-subtle"></div>
      </motion.div>
      
      {/* White neon grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute left-0 right-0 h-[1px] bg-white/20" 
          style={{ boxShadow: '0 0 8px 1px rgba(255,255,255,0.3), 0 0 12px 1px rgba(255,255,255,0.2)' }}
          initial={{ opacity: 0, y: '30%' }}
          animate={{ opacity: 1, y: '100vh' }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear", repeatDelay: 0 }}
        />
        <motion.div 
          className="absolute left-0 right-0 h-[1px] bg-white/20" 
          style={{ boxShadow: '0 0 8px 1px rgba(255,255,255,0.3), 0 0 12px 1px rgba(255,255,255,0.2)' }}
          initial={{ opacity: 0, y: '60%' }}
          animate={{ opacity: 1, y: '100vh' }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear", repeatDelay: 0, delay: 5 }}
        />
        <motion.div 
          className="absolute top-0 bottom-0 w-[1px] bg-white/20" 
          style={{ boxShadow: '0 0 8px 1px rgba(255,255,255,0.3), 0 0 12px 1px rgba(255,255,255,0.2)' }}
          initial={{ opacity: 0, x: '40%' }}
          animate={{ opacity: 1, x: '100vw' }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear", repeatDelay: 0, delay: 2 }}
        />
      </div>
    </div>
  );
};

export default GridBackground;

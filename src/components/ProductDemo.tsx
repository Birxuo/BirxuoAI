
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Shield, Zap } from 'lucide-react';

const ProductDemo: React.FC = () => {
  return (
    <div className="relative py-16 bg-black/50 backdrop-blur-sm">
      {/* Add animated neon line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-0 left-0 right-0 h-[1px] bg-white/30"
          style={{ boxShadow: '0 0 8px rgba(255,255,255,0.5), 0 0 15px rgba(255,255,255,0.3)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/30"
          style={{ boxShadow: '0 0 8px rgba(255,255,255,0.5), 0 0 15px rgba(255,255,255,0.3)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white text-shadow-white">Enterprise-Grade Security & Performance</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Built with military-grade encryption and quantum-resistant algorithms for the highest level of data protection and system performance.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* Feature 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 group hover:border-primary/50 transition-all duration-300 neon-pulse"
            whileHover={{
              y: -5,
              transition: { duration: 0.2 }
            }}
          >
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-all duration-300">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-all duration-300 text-shadow-white">Quantum Encryption</h3>
            <p className="text-white/70">
              Future-proof security with quantum-resistant algorithms and multi-layer encryption protocols.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 group hover:border-primary/50 transition-all duration-300 neon-pulse"
            whileHover={{
              y: -5,
              transition: { duration: 0.2 }
            }}
          >
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-all duration-300">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-all duration-300 text-shadow-white">High-Performance</h3>
            <p className="text-white/70">
              Ultra-fast response times with distributed edge computing and intelligent caching systems.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 group hover:border-primary/50 transition-all duration-300 neon-pulse"
            whileHover={{
              y: -5,
              transition: { duration: 0.2 }
            }}
          >
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-all duration-300">
              <Cpu className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-all duration-300 text-shadow-white">AI Optimization</h3>
            <p className="text-white/70">
              Self-optimizing systems that learn from usage patterns to deliver personalized performance.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDemo;

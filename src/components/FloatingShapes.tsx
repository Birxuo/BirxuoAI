
import React from 'react';
import { motion } from 'framer-motion';

const FloatingShapes: React.FC = () => {
  const shapes = [
    // Circles
    { type: 'circle', size: 40, left: '10%', top: '20%', delay: 0 },
    { type: 'circle', size: 24, left: '85%', top: '65%', delay: 1.5 },
    // Squares
    { type: 'square', size: 32, left: '75%', top: '15%', delay: 0.5 },
    { type: 'square', size: 18, left: '15%', top: '75%', delay: 2 },
    // Triangles
    { type: 'triangle', size: 36, left: '60%', top: '80%', delay: 1 },
    { type: 'triangle', size: 24, left: '25%', top: '40%', delay: 2.5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: shape.left,
            top: shape.top,
            width: shape.size,
            height: shape.type === 'triangle' ? shape.size * 0.866 : shape.size,
            opacity: 0.2,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: [0.1, 0.2, 0.1], 
            y: [0, -15, 0],
            rotate: [0, shape.type === 'triangle' ? 180 : 45, 0],
          }}
          transition={{
            duration: 6,
            delay: shape.delay,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        >
          {shape.type === 'circle' && (
            <div className="w-full h-full rounded-full border border-white/30" 
              style={{ boxShadow: '0 0 10px rgba(255,255,255,0.2), inset 0 0 5px rgba(255,255,255,0.1)' }} />
          )}
          {shape.type === 'square' && (
            <div className="w-full h-full border border-white/30 rotate-45" 
              style={{ boxShadow: '0 0 10px rgba(255,255,255,0.2), inset 0 0 5px rgba(255,255,255,0.1)' }} />
          )}
          {shape.type === 'triangle' && (
            <div className="w-full h-0" style={{
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size * 0.866}px solid rgba(255,255,255,0.2)`,
              filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.3))'
            }} />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingShapes;

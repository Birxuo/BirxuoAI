
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Lock, Code, Brain, Search, Sparkles } from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeatureShowcase: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: "Advanced AI Intelligence",
      description: "State-of-the-art language models with reasoning capabilities and contextual understanding.",
      gradient: "from-purple-500/20 to-pink-500/20",
    },
    {
      icon: Shield,
      title: "End-to-End Encryption",
      description: "Military-grade encryption ensures your conversations remain private and secure.",
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: Code,
      title: "Code Generation",
      description: "Generate, debug, and optimize code in multiple programming languages with AI assistance.",
      gradient: "from-green-500/20 to-emerald-500/20",
    },
    {
      icon: Search,
      title: "Web Search Integration",
      description: "Access real-time information from the web to enhance AI responses and accuracy.",
      gradient: "from-orange-500/20 to-red-500/20",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized infrastructure delivering responses in milliseconds with 99.9% uptime.",
      gradient: "from-yellow-500/20 to-orange-500/20",
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "Zero data collection policy. Your information stays yours, always.",
      gradient: "from-indigo-500/20 to-purple-500/20",
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Communicate in over 100 languages with natural understanding and context.",
      gradient: "from-teal-500/20 to-green-500/20",
    },
    {
      icon: Sparkles,
      title: "Creative Assistance",
      description: "From writing to art generation, unleash your creativity with AI-powered tools.",
      gradient: "from-pink-500/20 to-rose-500/20",
    },
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Powerful Features
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Experience the next generation of AI with advanced capabilities designed for productivity, creativity, and security.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradient={feature.gradient}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default FeatureShowcase;

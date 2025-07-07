import React from 'react';
import { motion } from 'framer-motion';
import { Code, Terminal, Brackets, Hash } from 'lucide-react';
const VizCode: React.FC = () => {
  // Generate random binary strings for animation
  const generateBinary = () => {
    return Array.from({
      length: 10
    }, () => Math.round(Math.random())).join('');
  };
  const icons = [Code, Terminal, Brackets, Hash];
  const RandomIcon = icons[Math.floor(Math.random() * icons.length)];
  return <section className="relative py-28 overflow-hidden">
      
      
      {/* Animated lines */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({
        length: 8
      }).map((_, i) => <motion.div key={i} className="absolute h-[1px] bg-white" style={{
        left: 0,
        right: 0,
        top: `${(i + 1) * 12.5}%`,
        boxShadow: '0 0 8px rgba(255,255,255,0.8), 0 0 12px rgba(255,255,255,0.4)'
      }} animate={{
        opacity: [0.3, 1, 0.3],
        scaleX: [0, 1, 0]
      }} transition={{
        duration: 5,
        delay: i * 0.4,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut"
      }} />)}
      </div>
      
      {/* Binary matrix rain animation */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {Array.from({
        length: 20
      }).map((_, i) => <motion.div key={i} className="absolute text-xs font-mono text-white/70" style={{
        left: `${i * 5}%`,
        top: -100
      }} animate={{
        top: ["0%", "100%"],
        opacity: [0, 1, 0]
      }} transition={{
        duration: Math.random() * 10 + 15,
        repeat: Infinity,
        delay: Math.random() * 5
      }}>
            {Array.from({
          length: 15
        }).map((_, j) => <div key={j} className="my-2">
                {generateBinary()}
              </div>)}
          </motion.div>)}
      </div>
      
      
    </section>;
};
interface CodeBlockProps {
  delayMultiplier: number;
}
const CodeBlock: React.FC<CodeBlockProps> = ({
  delayMultiplier
}) => {
  const codeExamples = [{
    title: "Security First",
    code: `function encryptData(data: string): string {
  const cipher = createCipher('aes-256-gcm');
  return cipher.encrypt(data, SECRET_KEY);
}

const secureConfig = {
  quantum_resistant: true,
  cipher_strength: 'military-grade',
  zero_knowledge: true
};`,
    language: "TypeScript",
    icon: <Terminal className="w-5 h-5" />
  }, {
    title: "Performance Focused",
    code: `async function fetchOptimized<T>(
  endpoint: string, 
  config: RequestConfig
): Promise<T> {
  const cached = await cache.get(cacheKey);
  if (cached) return cached;
    
  const result = await api.request(endpoint);
  await cache.set(cacheKey, result);
  return result;
}`,
    language: "TypeScript",
    icon: <Code className="w-5 h-5" />
  }, {
    title: "AI Integration",
    code: `const modelResponse = await birxuo.complete({
  prompt: userInput,
  model: "birxuo-quantum-7b",
  temperature: 0.7,
  max_tokens: 2048,
  stream: true,
  callbacks: {
    onToken: token => updateUI(token),
    onComplete: () => finishGeneration()
  }
});`,
    language: "TypeScript",
    icon: <Brackets className="w-5 h-5" />
  }];
  const example = codeExamples[delayMultiplier % codeExamples.length];
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} whileInView={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.6,
    delay: 0.2 * delayMultiplier
  }} viewport={{
    once: true
  }} whileHover={{
    y: -5,
    transition: {
      duration: 0.2
    }
  }} className="rounded-lg border border-white/20 overflow-hidden bg-black relative group" style={{
    boxShadow: '0 0 20px rgba(255,255,255,0.05), 0 0 30px rgba(255,255,255,0.05)'
  }}>
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="px-5 py-3 border-b border-white/20 flex justify-between items-center bg-white/5">
        <div className="flex items-center space-x-2">
          <span className="text-white">{example.icon}</span>
          <span className="text-sm font-medium text-white">{example.title}</span>
        </div>
        <div className="text-xs text-white/70">{example.language}</div>
      </div>
      
      <pre className="p-5 text-white font-mono text-sm overflow-x-auto">
        <code>
          {example.code.split('\n').map((line, i) => <motion.div key={i} initial={{
          opacity: 0,
          x: -10
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.3,
          delay: 0.1 * i + 0.3 * delayMultiplier
        }} viewport={{
          once: true
        }} className="whitespace-pre">
              {line}
            </motion.div>)}
        </code>
      </pre>
      
      <motion.div className="absolute bottom-0 left-0 h-1 bg-white" style={{
      boxShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 15px rgba(255,255,255,0.4)'
    }} initial={{
      width: "0%"
    }} whileInView={{
      width: "100%"
    }} transition={{
      duration: 1.5,
      delay: 0.5 * delayMultiplier,
      ease: "easeInOut"
    }} viewport={{
      once: true
    }} />
    </motion.div>;
};
export default VizCode;
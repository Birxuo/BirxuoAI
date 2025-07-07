import React from 'react';
import { motion } from 'framer-motion';
import { Book, Code, Zap, Shield, Globe, Users, ArrowRight, CheckCircle, Star, Github, MessageSquare, FileText, Lightbulb, Settings, Database, Search, Terminal, Cpu, Brain, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Documentation = () => {
  const TeamMember: React.FC<{ name: string; role: string; background: string; }> = ({ name, role, background }) => {
    return (
      <div className="text-center p-4">
        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full mx-auto mb-3 flex items-center justify-center">
          <Users className="w-8 h-8 text-primary" />
        </div>
        <h4 className="font-medium text-white mb-1">{name}</h4>
        <p className="text-sm text-gray-400 mb-2">{role}</p>
        <p className="text-xs text-gray-500">{background}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Content remains the same */}
    </div>
  );
};

export default Documentation;

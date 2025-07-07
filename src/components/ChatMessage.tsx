import React, { useEffect, useRef } from 'react';
import { Message } from '@/context/AIContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { User, Bot, Clock, Bot as IconBot, Shield } from 'lucide-react';
import { useAI } from '@/context/AIContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
interface ChatMessageProps {
  message: Message;
}
const ChatMessage: React.FC<ChatMessageProps> = ({
  message
}) => {
  const isUser = message.role === 'user';
  const messageRef = useRef<HTMLDivElement>(null);
  const {
    multiModelEnabled,
    availableModels
  } = useAI();

  // Find model info if this message has a modelId
  const modelInfo = message.modelId ? availableModels.find(m => m.id === message.modelId) : null;
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, []);
  return <motion.div ref={messageRef} initial={{
    opacity: 0,
    y: 10
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.3
  }} className="">
      <div className="max-w-4xl mx-auto w-full flex gap-4 px-4 md:px-8">
        {/* Avatar Section */}
        <div className="flex flex-col items-center mt-0.5">
          <Avatar className={cn("h-8 w-8 border", isUser ? "bg-gray-700/30 border-gray-600/30" : "bg-gray-700/30 border-gray-600/30")}>
            <AvatarFallback className={cn("text-sm", isUser ? "text-gray-300" : "text-gray-300")}>
              {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </AvatarFallback>
          </Avatar>
          
          <div className="h-full w-px my-2 bg-gradient-to-b from-transparent via-gray-700/50 to-transparent"></div>
        </div>
        
        <div className="flex-1 min-w-0">
          {/* Author identification */}
          <div className="flex items-center mb-1.5">
            <span className={cn("text-xs font-medium", isUser ? "text-gray-300" : "text-gray-300")}>
              {isUser ? 'You' : 'BIRXUO AI'}
            </span>
            
            {!isUser && <div className="flex items-center ml-2">
                {modelInfo && multiModelEnabled && <div className="flex items-center">
                    <div className="h-1 w-1 rounded-full bg-gray-500 mx-2"></div>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <IconBot className="h-3 w-3" /> {modelInfo.name}
                    </span>
                  </div>}
              </div>}
          </div>
          
          {/* Message Content */}
          <div className={cn("rounded-lg py-3 px-4", isUser ? "bg-gray-700/30 border border-gray-600/30" : "bg-gray-700/30 border border-gray-600/30")}>
            <div className="text-sm text-gray-200 whitespace-pre-wrap break-words leading-relaxed">
              {message.content}
            </div>
          </div>
          
          {/* Message Footer */}
          <div className="flex justify-between mt-1.5">
            <div className="text-xs text-gray-500 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Clock className="h-3 w-3 mr-1" />
              {new Date(message.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
            </div>
            
            {!isUser && <div className="text-xs text-gray-500 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Shield className="h-3 w-3 mr-1" />
                Secure connection
              </div>}
          </div>
        </div>
      </div>
    </motion.div>;
};
export default ChatMessage;
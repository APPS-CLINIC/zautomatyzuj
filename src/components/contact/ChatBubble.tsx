import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';

interface ChatBubbleProps {
  role: 'user' | 'assistant';
  children: React.ReactNode;
  timestamp?: string;
  className?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ 
  role, 
  children, 
  timestamp, 
  className = '' 
}) => {
  const isUser = role === 'user';
  
  const bubbleVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const containerClasses = isUser 
    ? "flex justify-end" 
    : "flex justify-start";

  const bubbleClasses = isUser
    ? `bg-gradient-to-br from-brand-primary/20 via-brand-secondary/10 to-brand-accent/20 border border-brand-primary/30 rounded-3xl rounded-br-lg px-4 py-3 max-w-xs sm:max-w-sm md:max-w-md shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:shadow-brand-glow transition-all duration-300`
    : `bg-white/5 border border-white/10 rounded-3xl rounded-bl-lg px-4 py-3 max-w-xs sm:max-w-sm md:max-w-md shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:border-white/20 transition-all duration-300`;

  const avatarClasses = isUser
    ? "w-8 h-8 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center ml-2 flex-shrink-0"
    : "w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mr-2 flex-shrink-0";

  const IconComponent = isUser ? User : Bot;

  return (
    <motion.div
      className={`${containerClasses} ${className}`}
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-end space-x-2">
        {!isUser && (
          <div className={avatarClasses}>
            <IconComponent className="w-4 h-4 text-white" />
          </div>
        )}
        
        <div className="flex flex-col">
          <div className={`${bubbleClasses} group`}>
            <div className="text-sm text-white leading-relaxed">
              {children}
            </div>
          </div>
          
          {timestamp && (
            <div className={`text-xs text-slate-400 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
              {timestamp}
            </div>
          )}
        </div>

        {isUser && (
          <div className={avatarClasses}>
            <IconComponent className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatBubble;

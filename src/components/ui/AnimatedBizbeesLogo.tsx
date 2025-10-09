/**
 * AnimatedBizbeesLogo - Animated bee logo with flying and wing flapping
 */

import { motion } from 'framer-motion';

interface AnimatedBizbeesLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function AnimatedBizbeesLogo({ 
  size = 'md', 
  className = '' 
}: AnimatedBizbeesLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const wingSize = {
    sm: 'w-3 h-2',
    md: 'w-4 h-3',
    lg: 'w-6 h-4',
    xl: 'w-8 h-6',
  };

  const dotSize = {
    sm: 'w-1 h-1',
    md: 'w-1.5 h-1.5',
    lg: 'w-2 h-2',
    xl: 'w-3 h-3',
  };

  // Flying animation
  const flyingAnimation = {
    y: [0, -8, 0, -4, 0],
    x: [0, 2, -1, 1, 0],
    rotate: [0, 2, -1, 1, 0],
  };

  // Wing flapping animation
  const wingFlap = {
    scaleY: [1, 0.8, 1.2, 0.9, 1],
    rotate: [0, -5, 5, -2, 0],
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div 
        className="relative"
        animate={flyingAnimation}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse"
        }}
      >
        {/* Bee body */}
        <div className="relative">
          {/* Bee body with honey gradient */}
          <motion.div 
            className={`${sizeClasses[size]} bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg`}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            {/* Black stripes */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-gray-800"></div>
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-800"></div>
              <div className="absolute top-3/4 left-0 right-0 h-0.5 bg-gray-800"></div>
            </div>
            
            {/* Bee face */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
            </div>
          </motion.div>
          
          {/* Animated Wings */}
          <motion.div 
            className={`absolute -top-1 -left-1 ${wingSize[size]} bg-gray-600/80 rounded-full`}
            animate={wingFlap}
            transition={{
              duration: 0.15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className={`absolute -top-1 -right-1 ${wingSize[size]} bg-gray-600/80 rounded-full`}
            animate={{
              ...wingFlap,
              rotate: [0, 5, -5, 2, 0], // Opposite rotation for second wing
            }}
            transition={{
              duration: 0.15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        {/* Flight path trail dots - animated */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className={`absolute top-0 left-1/2 ${dotSize[size]} bg-yellow-300 rounded-full transform -translate-x-1/2 -translate-y-2 opacity-60`}
            animate={{
              opacity: [0.6, 0.2, 0.6],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className={`absolute top-1/4 right-0 ${dotSize[size]} bg-amber-300 rounded-full transform translate-x-2 opacity-40`}
            animate={{
              opacity: [0.4, 0.1, 0.4],
              scale: [1, 0.6, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
          <motion.div 
            className={`absolute bottom-0 left-1/2 ${dotSize[size]} bg-yellow-300 rounded-full transform -translate-x-1/2 translate-y-2 opacity-60`}
            animate={{
              opacity: [0.6, 0.2, 0.6],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div 
            className={`absolute top-3/4 left-0 ${dotSize[size]} bg-amber-300 rounded-full transform -translate-x-2 opacity-40`}
            animate={{
              opacity: [0.4, 0.1, 0.4],
              scale: [1, 0.6, 1],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

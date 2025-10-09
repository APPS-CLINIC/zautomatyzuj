/**
 * FlyingBees - Multiple small bees flying around the section
 */

import { motion } from 'framer-motion';

interface FlyingBeesProps {
  count?: number;
  className?: string;
}

export default function FlyingBees({ count = 8, className = '' }: FlyingBeesProps) {
  const bees = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 0.4 + 0.6, // 0.6 to 1.0
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 4, // 4 to 7 seconds
    startX: Math.random() * 80 + 10, // 10-90%
    startY: Math.random() * 80 + 10, // 10-90%
  }));

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {bees.map((bee) => (
        <motion.div
          key={bee.id}
          className="absolute"
          style={{
            left: `${bee.startX}%`,
            top: `${bee.startY}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100, Math.random() * 200 - 100, 0],
            y: [0, Math.random() * 150 - 75, Math.random() * 150 - 75, 0],
            rotate: [0, Math.random() * 20 - 10, Math.random() * 20 - 10, 0],
          }}
          transition={{
            duration: bee.duration,
            delay: bee.delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          {/* Small bee */}
          <motion.div
            className="relative"
            style={{ scale: bee.size }}
            animate={{
              y: [0, -2, 0, -1, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Bee body */}
            <div className="relative">
              {/* Bee body with honey gradient */}
              <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 rounded-full flex items-center justify-center shadow-sm">
                {/* Black stripes */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div className="absolute top-1/4 left-0 right-0 h-px bg-gray-800"></div>
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-800"></div>
                  <div className="absolute top-3/4 left-0 right-0 h-px bg-gray-800"></div>
                </div>
              </div>
              
              {/* Animated Wings */}
              <motion.div 
                className="absolute -top-0.5 -left-0.5 w-1.5 h-1 bg-gray-600/60 rounded-full"
                animate={{
                  scaleY: [1, 0.5, 1.2, 0.8, 1],
                  rotate: [0, -2, 2, -1, 0],
                }}
                transition={{
                  duration: 0.08,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute -top-0.5 -right-0.5 w-1.5 h-1 bg-gray-600/60 rounded-full"
                animate={{
                  scaleY: [1, 0.5, 1.2, 0.8, 1],
                  rotate: [0, 2, -2, 1, 0],
                }}
                transition={{
                  duration: 0.08,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            
            {/* Small trail dot */}
            <motion.div 
              className="absolute top-0 left-1/2 w-0.5 h-0.5 bg-yellow-300/40 rounded-full transform -translate-x-1/2 -translate-y-1"
              animate={{
                opacity: [0.4, 0.1, 0.4],
                scale: [1, 0.5, 1],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

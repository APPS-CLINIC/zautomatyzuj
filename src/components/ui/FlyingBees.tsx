/**
 * FlyingBees - Multiple small bees flying around the section
 */

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface FlyingBeesProps {
  count?: number;
  className?: string;
}

interface Bee {
  id: number;
  size: number;
  delay: number;
  duration: number;
  startX: number;
  startY: number;
  animationX: number[];
  animationY: number[];
  animationRotate: number[];
}

export default function FlyingBees({ count = 8, className = '' }: FlyingBeesProps) {
  const [bees, setBees] = useState<Bee[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Generate deterministic but varied bee data
    const generatedBees = Array.from({ length: count }, (_, i) => {
      // Use a simple seed based on index for deterministic randomness
      const seed = i * 12345;
      const random = (seed: number) => {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
      };
      
      return {
        id: i,
        size: random(seed) * 0.4 + 0.6, // 0.6 to 1.0
        delay: random(seed + 1) * 2,
        duration: random(seed + 2) * 3 + 4, // 4 to 7 seconds
        startX: random(seed + 3) * 80 + 10, // 10-90%
        startY: random(seed + 4) * 80 + 10, // 10-90%
        animationX: [0, random(seed + 5) * 200 - 100, random(seed + 6) * 200 - 100, 0],
        animationY: [0, random(seed + 7) * 150 - 75, random(seed + 8) * 150 - 75, 0],
        animationRotate: [0, random(seed + 9) * 20 - 10, random(seed + 10) * 20 - 10, 0],
      };
    });
    
    setBees(generatedBees);
  }, [count]);

  // Don't render until client-side hydration is complete
  if (!isClient || bees.length === 0) {
    return <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} />;
  }

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
            x: bee.animationX,
            y: bee.animationY,
            rotate: bee.animationRotate,
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

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

interface WelcomeProps {
  onScrollPast: () => void;
}

const Cloud: React.FC<{ size: number }> = ({ size }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 60" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ opacity: 0.3 }}
  >
    <path d="M10 40 C15 20 35 20 40 30 C45 15 60 15 65 25 C70 15 85 15 90 30 C95 20 110 20 115 40 C115 50 105 55 90 55 C80 55 75 50 65 50 C55 50 50 55 40 55 C25 55 10 50 10 40 Z" 
          stroke="black" 
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
    />
    <path d="M25 35 Q30 25 35 35 M55 30 Q60 20 65 30 M80 35 Q85 25 90 35" 
          stroke="black" 
          strokeWidth="1.5"
          strokeLinecap="round"
    />
  </svg>
);

const Welcome: React.FC<WelcomeProps> = ({ onScrollPast }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [clouds, setClouds] = useState<{ x: number; y: number; size: number }[]>([]);

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setDimensions({
          width: ref.current.offsetWidth,
          height: ref.current.offsetHeight
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Gestionnaire d'événements pour le défilement
    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY > 0) {
        event.preventDefault();
        handleScrollPast();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [onScrollPast]);

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      const newClouds = [];
      const cloudCount = 5;
      const minDistance = 100;

      for (let i = 0; i < cloudCount; i++) {
        let newCloud;
        let overlap;
        do {
          overlap = false;
          const size = Math.floor(Math.random() * 64 + 64);
          newCloud = {
            x: Math.random() * (dimensions.width - size),
            y: Math.random() * (dimensions.height - size),
            size: size
          };

          for (const existingCloud of newClouds) {
            const dx = newCloud.x - existingCloud.x;
            const dy = newCloud.y - existingCloud.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < minDistance) {
              overlap = true;
              break;
            }
          }
        } while (overlap);

        newClouds.push(newCloud);
      }
      setClouds(newClouds);
    }
  }, [dimensions]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    },
    exit: {
      opacity: 0,
      y: '-100%',
      transition: { ease: "easeInOut", duration: 0.8 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const handleScrollPast = () => {
    onScrollPast();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.div
      ref={ref}
      className="h-screen flex items-center justify-center bg-gradient-to-br from-beige-100 to-white overflow-hidden relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {clouds.map((cloud, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: cloud.y,
            left: cloud.x,
          }}
          animate={{
            x: [0, Math.random() * 30 - 15, 0],
            y: [0, Math.random() * 20 - 10, 0],
          }}
          transition={{
            duration: Math.random() * 120 + 180,
            repeat: Infinity,
            repeatType: "reverse",
            ease: [0.45, 0.05, 0.55, 0.95], // Custom easing function for smoother movement
          }}
        >
          <Cloud size={cloud.size} />
        </motion.div>
      ))}
      <div className="text-center z-10">
        <motion.h2 
          className="text-3xl md:text-5xl text-gray-800 mb-4 font-playfair italic"
          variants={itemVariants}
        >
          Welcome friend,
        </motion.h2>
        <motion.h1 
          className="text-4xl md:text-7xl font-bold text-gray-900 mb-8 font-playfair"
          variants={itemVariants}
        >
          to my portfolio
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-gray-700 font-playfair"
          variants={itemVariants}
        >
          Scroll down to explore
        </motion.p>
        <motion.div 
          className="mt-12 inline-block"
          variants={itemVariants}
        >
          <motion.span 
            className="inline-block cursor-pointer p-2"
            initial={{ y: 0, filter: "drop-shadow(0 0 0px rgba(0, 0, 0, 0))" }}
            whileHover={{
              y: 20,
              filter: "drop-shadow(0 0 8px rgba(0, 0, 0, 0.5))",
              transition: { duration: 0.2 }
            }}
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop"
            }}
            onClick={handleScrollPast}
          >
            <svg className="w-8 h-8 text-gray-700" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Welcome;
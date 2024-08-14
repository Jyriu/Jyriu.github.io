'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface WelcomeProps {
  onScrollPast: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onScrollPast }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {  // Déclenche après un petit défilement
        onScrollPast();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onScrollPast]);

  return (
    <motion.div
      ref={ref}
      className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-100%' }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <h1 className="text-4xl md:text-6xl text-white font-bold text-center">
        Bienvenue sur mon portfolio
      </h1>
    </motion.div>
  );
};

export default Welcome;
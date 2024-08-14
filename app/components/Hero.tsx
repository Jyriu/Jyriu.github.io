'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BoxReveal } from '@/components/boxreveal';
import { SparklesText } from '@/components/sparklestext';

interface TypingAnimationProps {
  text: string;
  duration?: number;
  onComplete?: () => void;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({ text, duration = 100, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingEffect);
        if (onComplete) onComplete();
      }
    }, duration);

    return () => clearInterval(typingEffect);
  }, [text, duration, onComplete]);

  return <span>{displayedText}</span>;
};

const Hero: React.FC = () => {
  const [startAnimation, setStartAnimation] = useState(false);
  const [nameTypingComplete, setNameTypingComplete] = useState(false);
  const [titleTypingComplete, setTitleTypingComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="qui-suis-je" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between lg:space-x-32">
        <motion.div 
          className="lg:w-5/12 mb-10 lg:mb-0 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: startAnimation ? 1 : 0, y: startAnimation ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h1 className="text-6xl lg:text-9xl font-bold mb-4 text-gray-900 uppercase" style={{ fontFamily: "'Courier Prime', monospace" }}>
            {startAnimation && !nameTypingComplete && (
              <TypingAnimation
                text="SAMI YEZZA"
                duration={100}
                onComplete={() => setNameTypingComplete(true)}
              />
            )}
            {nameTypingComplete && (
              <SparklesText
                text="SAMI YEZZA"
                colors={{ first: "#9E7AFF", second: "#FE8BBB" }}
                className="text-6xl lg:text-9xl font-bold mb-4 text-gray-900 uppercase"
                sparklesCount={20}
              />
            )}
          </h1>
          <p className={`text-2xl lg:text-3xl text-gray-700 transition-all duration-1000 ease-out ${startAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ fontFamily: "'Courier Prime', monospace" }}>
            {nameTypingComplete && !titleTypingComplete && (
              <TypingAnimation
                text="SOFTWARE & DATA ENGINEER"
                duration={50}
                onComplete={() => setTitleTypingComplete(true)}
              />
            )}
            {titleTypingComplete && (
              <SparklesText
                text="SOFTWARE & DATA ENGINEER"
                colors={{ first: "#4A90E2", second: "#50E3C2" }}
                className="text-2xl lg:text-3xl text-gray-700"
                sparklesCount={12}
              />
            )}
          </p>
        </motion.div>
        <div className="lg:w-5/12">
          {startAnimation && (
            <BoxReveal width="100%" boxColor="#000000" duration={1.4}>
              <p className="text-lg text-gray-600 leading-relaxed">
                Passionné par la technologie, en particulier le software et la data, je suis en constante évolution dans le domaine numérique. Titulaire d'un Master en Management & Transformation Digitale, j'approfondis actuellement mes compétences techniques avec un second Master en Développement, Big Data & IA. Mon objectif est de combiner ma vision stratégique du digital avec des compétences techniques pointues pour créer des solutions innovantes et impactantes.
              </p>
            </BoxReveal>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
'use client';

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (event.clientY <= 50) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsVisible(true);
      } else {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setIsVisible(false), 300);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const navItems = ['Qui suis-je ?', 'Parcours', 'Compétences', 'Projets', 'Contact'];
  const middleIndex = Math.floor(navItems.length / 2);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    let element: Element | null;
    
    if (id === 'qui-suis-je') {
      element = document.getElementById('qui-suis-je');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      element = document.getElementById(id);
      if (element) {
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header 
          className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-filter backdrop-blur-lg"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-6 flex justify-center items-center">
            <nav className="relative">
              <ul className="flex space-x-12 relative">
                {navItems.map((item, index) => {
                  const isLeftSide = index < middleIndex;
                  const distance = isLeftSide ? middleIndex - index : index - middleIndex + (navItems.length % 2 === 0 ? 1 : 0);
                  const itemId = item.toLowerCase().replace(/\s/g, '-').replace(/[?]/g, '');
                  
                  return (
                    <motion.li 
                      key={item} 
                      className="relative overflow-hidden"
                      initial={{ opacity: 0, x: isLeftSide ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: distance * 0.1 }}
                    >
                      <a 
                        href={`#${itemId}`}
                        onClick={(e) => handleClick(e, itemId)}
                        className="text-gray-800 hover:text-gray-600 transition-all duration-300 relative group text-lg font-medium inline-block"
                      >
                        {item}
                        <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </nav>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Header;
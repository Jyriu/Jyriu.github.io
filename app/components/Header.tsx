'use client';

import React, { useState, useEffect } from "react";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('qui-suis-je');
      if (heroSection) {
        const heroTop = heroSection.offsetTop;
        const scrollPosition = window.scrollY + window.innerHeight;
        if (scrollPosition >= heroTop - 100 && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasAnimated]);

  const navItems = ['Qui suis-je ?', 'Parcours', 'Compétences', 'Projets', 'Contact'];
  const middleIndex = Math.floor(navItems.length / 2);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = id === 'qui-suis-je' 
      ? document.querySelector('main > section:first-of-type')
      : document.getElementById(id);
    
    if (element) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-1000 ease-in-out 
        ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} 
        bg-white/10 backdrop-filter backdrop-blur-lg
      `}
    >
      <div className="container mx-auto px-4 py-6 flex justify-center items-center">
        <nav className="relative">
          <ul className="flex space-x-12 relative">
            {navItems.map((item, index) => {
              const isLeftSide = index < middleIndex;
              const distance = isLeftSide ? middleIndex - index : index - middleIndex + (navItems.length % 2 === 0 ? 1 : 0);
              const itemId = item.toLowerCase().replace(/\s/g, '-').replace(/[?]/g, '');
              
              return (
                <li key={item} className="relative overflow-hidden">
                  <a 
                    href={`#${itemId}`}
                    onClick={(e) => handleClick(e, itemId)}
                    className={`
                      text-gray-800 hover:text-gray-600 
                      transition-all duration-700 
                      relative group text-lg font-medium inline-block
                    `}
                  >
                    <span 
                      className={`
                        inline-block transition-all duration-700 
                        ${isVisible ? 'translate-x-0 opacity-100' : `${isLeftSide ? 'translate-x-full' : '-translate-x-full'} opacity-0`}
                      `} 
                      style={{ transitionDelay: `${distance * 150 + 500}ms` }}
                    >
                      {item}
                    </span>
                    <span className="
                      absolute left-0 right-0 bottom-0 h-0.5 
                      bg-gray-800 transform scale-x-0 
                      group-hover:scale-x-100 transition-transform duration-300
                    "></span>
                  </a>
                </li>
              );
            })}
          </ul>
          <div 
            className={`
              absolute bottom-0 left-1/2 right-1/2 h-0.5 
              bg-gray-800 transition-all duration-1000 ease-in-out 
              ${isVisible ? 'left-0 right-0' : ''}
            `}
            style={{ transitionDelay: '500ms' }}
          ></div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
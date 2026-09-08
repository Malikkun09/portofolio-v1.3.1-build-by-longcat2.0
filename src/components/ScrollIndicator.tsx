'use client';

import React, { useState, useEffect } from 'react';

export default function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${(totalScroll / windowHeight) * 100}%`;
      
      setScrollProgress((totalScroll / windowHeight) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50 mix-blend-difference hidden md:block">
      <div className="w-px h-16 bg-white/20 relative overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-full bg-white transition-all duration-150 ease-out"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>
    </div>
  );
}

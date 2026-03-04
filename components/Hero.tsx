import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center mb-2">
        <span className="google-symbols text-primary text-[42px]">google_labs</span>
      </div>
      
      <h1 className="font-playfair italic text-5xl md:text-[56px] font-normal tracking-tight text-on-surface leading-tight">
        Welcome to Pomelli
      </h1>
      
      <p className="text-on-surface-variant text-xl md:text-[22px] font-normal max-w-2xl mt-1">
        Easily generate on brand social media campaigns
      </p>
    </div>
  );
};
import React, { useState } from 'react';

interface EnterWebsiteProps {
  onContinue: (url: string) => void;
}

export const EnterWebsite: React.FC<EnterWebsiteProps> = ({ onContinue }) => {
  const [url, setUrl] = useState('');

  const isInputEmpty = url.trim() === '';

  return (
    <div className="relative p-[2px] rounded-[50px] overflow-hidden opacity-0 animate-slide-up-fade">
      {/* 
        Animated Glowing Background Layer 
        Replicates the .glo-mye CSS logic with conic-gradient and color mixing 
      */}
      <div className="absolute inset-[-50%] z-0 opacity-70 blur-[18px]">
        <div 
          className="w-full h-full animate-[spin_6s_linear_infinite]"
          style={{
            backgroundImage: `conic-gradient(
              transparent, 
              var(--tw-colors-primary), 
              color-mix(in srgb, var(--tw-colors-primary) 80%, var(--tw-colors-tertiary) 20%), 
              color-mix(in srgb, var(--tw-colors-primary) 65%, var(--tw-colors-tertiary) 35%), 
              color-mix(in srgb, var(--tw-colors-primary) 50%, var(--tw-colors-tertiary) 50%), 
              color-mix(in srgb, var(--tw-colors-primary) 30%, var(--tw-colors-tertiary) 70%), 
              transparent 50%
            )`
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 bg-surface-high rounded-[48px] w-[526px] max-w-full px-10 py-8 flex flex-col items-center text-center shadow-2xl">
        
        <h2 className="font-playfair italic text-4xl tracking-tight text-on-surface mb-[4px]">
          Enter your website
        </h2>
        
        <p className="font-sans text-on-surface-variant font-light text-base leading-6 mb-[36px]">
          We'll analyze your business and generate your Business DNA
        </p>

        <input
          type="text"
          placeholder="www.example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full bg-surface-container text-on-surface placeholder:text-outline font-sans text-[22px] leading-7 rounded-2xl border-none p-6 mb-[36px] focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
        />

        <button 
          onClick={() => onContinue(url)}
          disabled={isInputEmpty}
          className={`w-full h-[56px] rounded-full font-sans font-medium text-[14px] tracking-wide transition-all duration-300 ${
            isInputEmpty 
              ? 'bg-on-surface/10 text-on-surface/40 cursor-default pointer-events-none' 
              : 'bg-primary text-on-primary hover:bg-primary/90 shadow-lg shadow-primary/20 hover:-translate-y-0.5'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};
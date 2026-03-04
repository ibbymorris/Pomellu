import React, { useState, useEffect } from 'react';

interface GeneratingDNAProps {
  url: string;
  onComplete: () => void;
}

const ACTIONS = [
  "Summarizing your business",
  "Extracting brand colors",
  "Identifying target audience",
  "Analyzing tone of voice",
  "Generating brand pillars",
  "Reviewing key products"
];

export const GeneratingDNA: React.FC<GeneratingDNAProps> = ({ url, onComplete }) => {
  const [phase, setPhase] = useState<'fetching' | 'analyzing'>('fetching');
  const [actionIndex, setActionIndex] = useState(0);

  const displayUrl = url.startsWith('http') ? url : `https://${url}`;

  useEffect(() => {
    // Switch to analyzing phase after 2 seconds
    const phaseTimer = setTimeout(() => {
      setPhase('analyzing');
    }, 2000);

    return () => clearTimeout(phaseTimer);
  }, []);

  useEffect(() => {
    if (phase === 'analyzing') {
      const interval = setInterval(() => {
        setActionIndex((prev) => (prev + 1) % ACTIONS.length);
      }, 2000); // cycle text every 2s

      // Complete the process after 8 seconds of analyzing
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 8000);

      return () => {
        clearInterval(interval);
        clearTimeout(completeTimer);
      };
    }
  }, [phase, onComplete]);

  return (
    <div className="flex flex-col items-center animate-slide-up-fade opacity-0 w-full">
      <div className="relative p-[2px] rounded-[50px] overflow-hidden w-[600px] max-w-full">
        {/* Glow Background */}
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

        {/* Card Content */}
        <div className="relative z-10 bg-surface-high rounded-[48px] px-10 py-12 flex flex-col items-center text-center shadow-2xl transition-all duration-500">
          
          <h2 className="font-playfair italic text-4xl md:text-[40px] tracking-tight text-on-surface mb-4 leading-tight">
            Generating your Business <br/> DNA
          </h2>
          
          <p className="font-sans text-on-surface-variant font-light text-[15px] leading-6 mb-8 max-w-[400px]">
            We're researching and analyzing your business.<br/>
            It will take several minutes. Feel free to come back later.
          </p>

          {/* Dynamic Status Pill */}
          <div className="bg-[#2c3400] text-primary px-5 py-2.5 rounded-full flex items-center justify-center gap-2 font-sans text-[15px] font-medium mb-4 transition-all duration-300 shadow-inner w-max mx-auto">
            <span className="google-symbols text-[18px]">spark</span>
            <span className="animate-pulse whitespace-nowrap">
              {phase === 'fetching' ? "Analyzing your website" : ACTIONS[actionIndex]}
            </span>
          </div>

          {/* Mock Browser (Visible only in analyzing phase) */}
          {phase === 'analyzing' && (
            <div className="w-full max-w-[480px] h-[300px] bg-white rounded-3xl mt-4 mb-4 overflow-hidden flex flex-col shadow-xl animate-slide-up-fade opacity-0 border border-outline/20">
              {/* Fake Browser Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-white z-10">
                 <div className="flex gap-4 text-[11px] font-sans text-gray-800 font-medium">
                    <span>Home</span><span>Menu</span><span>Instagram</span><span>More</span>
                 </div>
                 <div className="w-12 h-12 bg-[#6E2424] text-white flex items-center justify-center text-[12px] font-playfair italic rounded-sm shrink-0 shadow-sm">
                    Muse
                 </div>
                 <div className="flex gap-3 text-gray-800">
                    <span className="material-symbols-outlined text-[16px]">person</span>
                    <span className="material-symbols-outlined text-[16px]">shopping_cart</span>
                 </div>
              </div>
              
              {/* Scrolling Website Content */}
              <div className="flex-1 w-full relative overflow-hidden bg-[#faf8f5]">
                 <div className="absolute top-0 left-0 w-full animate-scroll-up-down flex flex-col items-center">
                    
                    {/* Fake hero image/content area mimicking a cheesecake picture */}
                    <div className="w-full h-[250px] bg-gradient-to-b from-[#4A2B21] via-[#DAB196] to-[#F3E6DA] flex flex-col items-center justify-center relative">
                        {/* Mock element to resemble center focus of food photography */}
                        <div className="w-[70%] h-[160px] bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 flex flex-col items-center justify-center shadow-lg relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent"></div>
                            <div className="z-10 text-white font-playfair italic text-[22px] drop-shadow-md tracking-wide">Signature Collection</div>
                        </div>
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-[#6E2424] text-white rounded-full text-xs font-sans font-semibold shadow-md z-20">
                            Order now
                        </div>
                    </div>

                    {/* Fake body section to scroll into view */}
                    <div className="w-full h-[250px] bg-white flex items-center justify-center p-8 text-center border-t border-gray-100">
                        <div className="w-3/4 space-y-4">
                           <div className="h-4 bg-gray-200 rounded w-full"></div>
                           <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
                           <div className="h-4 bg-gray-200 rounded w-4/6 mx-auto"></div>
                        </div>
                    </div>

                 </div>
              </div>
            </div>
          )}

          {/* URL Display */}
          <div className="bg-[#1e1f20] text-primary px-5 py-3 rounded-2xl flex items-center justify-center gap-3 w-full max-w-[480px] mt-2 border border-[#333537]">
            <span className="material-symbols-outlined text-[20px]">link</span>
            <span className="font-sans text-[16px] tracking-wide truncate">{displayUrl}</span>
          </div>

        </div>
      </div>
      
      {/* Bottom Loading Indicator */}
      <div className="flex items-center gap-2 mt-8 text-primary font-sans text-[15px] font-medium opacity-90">
        <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
        Analyzing data...
      </div>
    </div>
  );
};
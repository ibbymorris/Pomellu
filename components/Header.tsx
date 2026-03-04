import React from 'react';

interface HeaderProps {
  currentView: 'home' | 'enter-website' | 'generating-dna';
  onBack: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onBack }) => {
  return (
    <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none">
      <div className="pointer-events-auto">
        {currentView !== 'home' && (
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-[18px] py-[8px] rounded-full border border-[#46483b] bg-[#1b1b1b]/80 hover:bg-surface-highest transition-all font-sans text-sm font-medium text-primary shadow-sm"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back
          </button>
        )}
      </div>
      
      <div className="flex items-center gap-4 pointer-events-auto">
        <button className="text-outline hover:text-on-surface transition-colors p-2 rounded-full hover:bg-surface-highest/50">
          <span className="material-symbols-outlined text-[28px]">more_vert</span>
        </button>
        
        {/* Mock User Avatar matching the screenshot */}
        <button className="w-9 h-9 rounded-full bg-[#f48fb1] flex items-center justify-center text-white font-medium text-sm border border-[#f8bbd0]/30 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary">
          I
        </button>
      </div>
    </header>
  );
};
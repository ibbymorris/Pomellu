import React from 'react';

interface FeatureCardProps {
  step: number;
  title: string;
  icon: string;
  description: string;
  iconBgColor: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  step,
  title,
  icon,
  description,
  iconBgColor,
}) => {
  return (
    <div className="relative p-[2px] rounded-[48px] overflow-hidden w-full max-w-[320px] mx-auto md:w-[300px] group transition-transform duration-300 hover:-translate-y-1">
      {/* Animated Glowing Border Effect */}
      <div className="absolute inset-[-100%] z-0 opacity-60 blur-[18px] transition-opacity duration-500 group-hover:opacity-100">
        <div 
          className="w-full h-full animate-[spin_8s_linear_infinite]"
          style={{
            backgroundImage: 'conic-gradient(from 0deg, transparent 0%, var(--tw-colors-primary) 25%, var(--tw-colors-tertiary) 50%, transparent 75%)'
          }}
        />
      </div>

      {/* Card Content Surface */}
      <div className="relative z-10 bg-surface-highest rounded-[46px] p-6 pb-10 h-full flex flex-col items-center text-center gap-4">
        
        {/* Step Indicator */}
        <div className="w-[30px] h-[30px] rounded-full border border-outline text-primary flex items-center justify-center text-sm font-medium mt-2">
          {step}
        </div>

        {/* Title */}
        <h3 className="font-playfair italic text-2xl text-on-surface mt-2 mb-2">
          {title}
        </h3>

        {/* Icon Container */}
        <div className={`w-[130px] h-[130px] rounded-[36px] flex items-center justify-center text-on-primary mb-2 shadow-inner ${iconBgColor}`}>
          <span className="material-symbols-outlined text-[50px]">{icon}</span>
        </div>

        {/* Description */}
        <p className="text-on-surface-variant text-[15px] leading-[1.4] px-2">
          {description}
        </p>
        
      </div>
    </div>
  );
};
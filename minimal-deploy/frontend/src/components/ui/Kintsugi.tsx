import React from 'react';

export const Kintsugi: React.FC = () => {
  return (
    <svg 
      className="pointer-events-none absolute inset-0 -z-9 h-full w-full opacity-70" 
      viewBox="0 0 100 200" 
      preserveAspectRatio="none"
    >
      <g 
        stroke="#D6B55B" 
        strokeWidth="0.3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path 
          d="M10 152 C 18 138, 28 134, 36 118 S 55 94, 66 86 84 68, 90 60" 
          fill="none" 
        />
        <path 
          d="M20 22 C 32 30, 40 42, 48 54 S 62 78, 72 86" 
          fill="none" 
        />
        <path 
          d="M12 106 C 20 104, 28 110, 34 118 S 46 134, 54 142" 
          fill="none" 
        />
      </g>
    </svg>
  );
};


import React from 'react';

export const Frame: React.FC = () => {
  return (
    <svg 
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full" 
      viewBox="0 0 100 200" 
      preserveAspectRatio="none"
    >
      <rect 
        x="2" 
        y="2" 
        width="96" 
        height="196" 
        rx="3" 
        fill="none" 
        stroke="#936b5b" 
        strokeWidth="1.2" 
      />
      <rect 
        x="4" 
        y="4" 
        width="92" 
        height="192" 
        rx="2.5" 
        fill="none" 
        stroke="#c79b5e" 
        strokeWidth="0.6" 
      />
      <path 
        d="M7 10 C 7 30, 17 26, 17 40 C 17 60, 7 56, 7 78 C 7 96, 17 92, 17 112 C 17 134, 7 130, 7 154 C 7 172, 14 178, 14 188" 
        stroke="#5b816e" 
        strokeWidth=".6" 
        fill="none" 
      />
      <path 
        d="M93 10 C 93 30, 83 26, 83 40 C 83 60, 93 56, 93 78 C 93 96, 83 92, 83 112 C 83 134, 93 130, 93 154 C 93 172, 86 178, 86 188" 
        stroke="#5b816e" 
        strokeWidth=".6" 
        fill="none" 
      />
    </svg>
  );
};


import React from 'react';

interface TitleBarProps {
  text?: string;
}

export const TitleBar: React.FC<TitleBarProps> = ({ text = "ПРИНЯТИЕ ТЕНИ" }) => {
  return (
    <div className="mx-auto mt-3 w-[92%] rounded-xl border border-amber-900/40 bg-frame-gradient p-3 text-center shadow-[inset_0_2px_0_rgba(255,255,255,.35),0_10px_40px_rgba(0,0,0,.35)]">
      <h1 className="select-none font-gothic text-[28px] tracking-[.06em] text-amber-900 drop-shadow">
        {text}
      </h1>
    </div>
  );
};


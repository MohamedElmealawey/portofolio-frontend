import React from 'react';

const ScrollDown = () => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center pointer-events-none">
      <span className="text-xs font-medium tracking-widest uppercase text-zinc-500 mb-2">
        Scroll
      </span>
      <div className="relative w-6 h-10 border-2 border-zinc-700">
        <div className="absolute w-1 h-2 bg-amber-500 left-1/2 transform -translate-x-1/2 top-1 animate-scrollWheel"></div>
      </div>
    </div>
  );
};

export default ScrollDown;
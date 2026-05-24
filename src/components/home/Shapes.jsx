import React from 'react';

const Shapes = () => {
  
  const shapes = [
    { className: "top-[5%] left-[2%] w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-teal-200/30 rounded-full blur-3xl" },
    { className: "top-[15%] right-[5%] w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-blue-200/30 rounded-full blur-3xl" },
    { className: "bottom-[10%] left-[8%] w-36 sm:w-56 md:w-72 h-36 sm:h-56 md:h-72 bg-purple-200/30 rounded-full blur-3xl" },
    { className: "bottom-[20%] right-[10%] w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-teal-100/40 rounded-full blur-3xl" },
    { className: "top-[30%] left-[20%] w-24 sm:w-36 md:w-48 h-24 sm:h-36 md:h-48 bg-cyan-200/30 rounded-full blur-3xl" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => (
        <div
          key={index}
          className={`absolute ${shape.className} animate-float`}
          style={{
            animationDelay: `${index * 0.5}s`,
            animationDuration: `${8 + index * 2}s`
          }}
        />
      ))}
    </div>
  );
};

export default Shapes;
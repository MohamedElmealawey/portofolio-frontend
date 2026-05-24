import React from 'react';

const Headersoials = () => {
  const socialLinks = [
    { icon: 'fab fa-github', href: '#', label: 'GitHub' },
    { icon: 'fab fa-linkedin-in', href: '#', label: 'LinkedIn' },
    { icon: 'fab fa-twitter', href: '#', label: 'Twitter' },
    { icon: 'fab fa-codepen', href: '#', label: 'CodePen' }
  ];

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm tracking-wider text-zinc-500 mr-2">FOLLOW ME</span>
      <div className="w-12 h-px bg-amber-500"></div>
      {socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.href}
          aria-label={social.label}
          className="group"
        >
          <div className="w-10 h-10 flex items-center justify-center border border-zinc-800 text-zinc-500 text-lg transition-all duration-300 hover:border-amber-500 hover:bg-amber-500 hover:text-white">
            <i className={social.icon}></i>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Headersoials;
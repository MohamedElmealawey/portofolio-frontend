import React from 'react';
import { Link } from 'react-router-dom';

const Notfound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-amber-500 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-white mb-6">PAGE NOT FOUND</h2>
        <p className="text-zinc-400 mb-8">The page you are looking for doesn't exist or has been moved.</p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-white font-medium tracking-wider hover:bg-amber-600 transition-colors duration-300"
        >
          <i className="icon-home"></i>
          BACK TO HOME
        </Link>
      </div>
    </div>
  );
};

export default Notfound;
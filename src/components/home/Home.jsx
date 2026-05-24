import React, { useState } from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiCodepen, FiArrowRight, FiDownload, FiFacebook, FiX } from 'react-icons/fi';
import Me from "../../assets/potofolio.png";
import Shapes from './Shapes';
import cv from "../../assets/Mohamed_Awad_FullStack.pdf";
const Home = () => {
  const [showCVModal, setShowCVModal] = useState(false);
  
  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/MohamedElmealawey', label: 'GitHub', color: 'hover:bg-gray-800' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/mohamedelmealawey', label: 'LinkedIn', color: 'hover:bg-blue-600' },
    { icon: FiFacebook, href: 'https://www.facebook.com/mohamed.awad.212132', label: 'Facebook', color: 'hover:bg-sky-500' },
  ];


  const handleDownload = () => {
    // Direct download link for Google Drive
    window.open(`https://drive.google.com/file/d/1eVguoLGSd73yDQJeGqrjnuom3XpZrpj-/view?usp=sharing`, '_blank');
  };

  const openCVModal = () => {
    setShowCVModal(true);
  };

  const closeCVModal = () => {
    setShowCVModal(false);
  };

  const CVModal = () => {
    return (
      <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
        <div className="relative w-full max-w-6xl h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl">
          {/* Modal Header */}
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-teal-600 to-teal-700 p-4 z-10">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                <span>📄</span>
                My CV
              </h3>
              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all text-sm"
                >
                  <FiDownload size={16} />
                  Download
                </button>
                <button
                  onClick={closeCVModal}
                  className="p-1.5 text-white hover:bg-white/20 rounded-lg transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Iframe Container */}
          <div className="pt-16 h-full">
            <iframe
              src={`https://drive.google.com/file/d/1eVguoLGSd73yDQJeGqrjnuom3XpZrpj-/preview`}
              title="CV Viewer"
              className="w-full h-full border-0"
              allow="autoplay"
            />
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 bg-gray-50 p-2 text-center text-xs text-gray-500 border-t border-gray-200">
            <p>PDF hosted on Google Drive • Last updated: March 2026</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="relative h-screen flex items-center bg-gradient-to-br from-slate-50 via-white to-teal-50" id="home">

      {/* Animated background shapes */}
      <Shapes/>
      
      {/* CV Modal */}
      {showCVModal && <CVModal />}
      
      {/* Main content */}
      <div className="container-custom w-full relative z-10 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grids-col-1 gap-8 lg:gap-12 items-center">
          
          {/* Left side - Content */}
          <div className="left_side animate-slideInLeft px-4 sm:px-6 lg:px-0">
            {/* Greeting badge */}
            <div className="inline-flex items-center gap-2 bg-white shadow-md rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6">
              <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
              <span className="text-xs sm:text-sm font-medium text-slate-600">AVAILABLE FOR FREELANCE</span>
            </div>
            
            {/* Name */}
            <h1 className="name text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-2 sm:mb-3">
              <span className="title text-teal-600 text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-1 sm:mt-2">Dev / </span>
              Mohammed
              <span className="title block text-slate-800 text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-1 sm:mt-2">Elmealawey</span>
            </h1>
            
            {/* Title */}
            <div className="mb-4 sm:mb-6">
              <span className="job text-lg sm:text-xl md:text-2xl text-slate-600 font-light">
                MERN-STACK <span className="text-teal-600 font-semibold">DEVELOPER</span>
              </span>
            </div>
            
            {/* Description */}
            <p className="desc text-sm sm:text-base text-slate-600 leading-relaxed mb-6 sm:mb-8 max-w-xl">
              Crafting robust web applications with modern technologies. 
              Turning complex problems into elegant, user-friendly solutions.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8">
              <a 
                href="#contact" 
                className="group btn-primary rounded-full text-sm sm:text-base px-4 sm:px-5 py-3 sm:py-3"
              >
                <span className="flex items-center gap-2">
                  HIRE ME
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </a>
              
              <a 
                href="#portfolio" 
                className="group btn-outline rounded-full text-sm sm:text-base px-4 sm:px-5 py-3 sm:py-3"
              >
                VIEW WORK
              </a>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-4 max-w-xs">
              <div>
                <span className="block text-2xl sm:text-3xl font-bold text-teal-600">1+</span>
                <span className="text-xs sm:text-sm text-slate-500">YEARS</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-bold text-teal-600">15+</span>
                <span className="text-xs sm:text-sm text-slate-500">PROJECTS</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-bold text-teal-600">10+</span>
                <span className="text-xs sm:text-sm text-slate-500">CLIENTS</span>
              </div>
            </div>
            
            {/* Social Icons */}
            <div className="social_icons flex items-center gap-3 sm:gap-4">
              <span className="text-xs sm:text-sm font-medium text-slate-500 tracking-wider">FOLLOW</span>
              <div className="w-8 sm:w-12 h-px bg-teal-600"></div>
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    target='_blank'
                    rel="noopener noreferrer"
                    className={`group w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-white rounded-full shadow-md text-slate-600 transition-all duration-300 ${social.color} hover:text-white hover:scale-110`}
                  >
                    <Icon className="text-sm sm:text-lg" />
                  </a>
                );
              })}
            </div>
          </div>
          
          {/* Right side - Image */}
          <div className="right_side relative animate-slideInRight px-4 sm:px-6 lg:px-0">
            <div className="relative group max-w-lg mx-auto">
              {/* Floating elements */}
              <div className="absolute -top-3 -right-3 sm:-top-6 sm:-right-6 w-20 h-20 sm:w-32 sm:h-32 bg-teal-200 rounded-full blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="absolute -bottom-3 -left-3 sm:-bottom-6 sm:-left-6 w-24 h-24 sm:w-40 sm:h-40 bg-blue-200 rounded-full blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              
              {/* Main image container */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
                {/* Decorative pattern */}
                <div className="absolute inset-0 bg-gradient-to-tr from-teal-600/20 via-transparent to-transparent z-10"></div>
                
                {/* Image */}
                <img 
                  src={Me} 
                  alt="Mohammed Awaad Elmealawey" 
                  className="w-full h-auto max-h-[350px] sm:max-h-[400px] lg:max-h-[450px] object-cover transform transition-all duration-700 group-hover:scale-105"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-teal-600/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Experience badge - hidden on mobile, visible on lg+ */}
              <div className="absolute -right-2 sm:-right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-3 hidden lg:block animate-float">
                <span className="block text-xl sm:text-2xl font-bold text-teal-600">1+</span>
                <span className="text-xs text-slate-600">Years Exp</span>
              </div>
            </div>
            
            {/* Download CV button - repositioned for mobile */}
            <div className="mt-4 sm:mt-6 text-center lg:hidden">
              <button 
                onClick={openCVModal}
                className="inline-flex items-center gap-2 bg-white rounded-full shadow-md px-4 py-2 text-sm text-slate-700 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              >
                <FiDownload className="text-teal-600" />
                <span>View CV</span>
              </button>
            </div>
            
            {/* Download CV button - desktop version */}
            <button 
              onClick={openCVModal}
              className="absolute -bottom-4 sm:-bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg px-4 sm:px-6 py-2 sm:py-3 flex items-center gap-2 sm:gap-3 hover:shadow-xl transition-shadow duration-300 group cursor-pointer hidden lg:flex"
            >
              <FiDownload className="text-teal-600 group-hover:translate-y-1 transition-transform duration-300" />
              <span className="text-xs sm:text-sm font-medium text-slate-700">View CV</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <a 
        href="#services" 
        className="scroll absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-2 text-slate-500 hover:text-teal-600 transition-colors duration-300 group"
      >
        <span className="text-xs font-medium tracking-widest uppercase hidden sm:block">Scroll</span>
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-current rounded-full flex justify-center">
          <div className="w-1 h-1.5 sm:h-2 bg-current rounded-full mt-2 animate-bounce"></div>
        </div>
      </a>
    </section>
  );
};

export default Home;
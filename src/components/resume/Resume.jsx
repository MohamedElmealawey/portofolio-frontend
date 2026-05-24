import React from 'react';
import { FiCode, FiCpu, FiDatabase, FiLayout, FiServer, FiTrendingUp, FiDownload } from 'react-icons/fi';

const Resume = () => {
  
  const skills = [
    { name: 'Html', level: 97, icon: FiCode },
    { name: 'Css', level: 98, icon: FiLayout },
    { name: 'JavaScript', level: 92, icon: FiCode },
    { name: 'React', level: 95, icon: FiLayout },
    { name: 'Node.js', level: 92, icon: FiServer },
    { name: 'MongoDB', level: 90, icon: FiDatabase },
    { name: 'TypeScript', level: 94, icon: FiCode },
    { name: 'Express.js', level: 88, icon: FiServer },
    { name: 'Postman', level: 96, icon: FiServer },
    { name: 'Tailwind CSS', level: 85, icon: FiLayout },
    { name: 'Redux', level: 87, icon: FiCpu },
    { name: 'Git/GitHub', level: 88, icon: FiCode },
  ];

  const skillCategories = [
    { name: 'Frontend', color: 'from-blue-500 to-cyan-500', value: 92 },
    { name: 'Backend', color: 'from-teal-500 to-emerald-500', value: 88 },
    { name: 'Database', color: 'from-orange-500 to-amber-500', value: 90 },
    { name: 'DevOps', color: 'from-purple-500 to-pink-500', value: 82 },
  ];

  return (
    <section className="mt-10 flex items-center justify-center bg-slate-50" id="resume">
      <div className="w-full h-full max-w-7xl mx-auto p-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white border border-teal-100 rounded-xl shadow-sm">
              <FiTrendingUp className="text-teal-600 text-xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Technical Expertise</h2>
              <p className="text-sm text-slate-500">MERN Stack Specialist</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Left Column - Skills Grid */}
      <div className="skills col-span-1 lg:col-span-7 bg-white rounded-2xl border border-teal-100 shadow-lg p-4 sm:p-5 overflow-y-auto">
      <h3 className="text-slate-800 font-semibold mb-4 flex items-center gap-2 text-xs sm:text-sm uppercase tracking-wider text-teal-700">
        <FiCode className="text-teal-600 text-sm sm:text-base" />
        Core Competencies
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <div key={index} className="bg-slate-50 hover:bg-teal-50 rounded-xl p-2 sm:p-3 transition-all duration-300 border border-slate-100">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="text-teal-600 text-xs sm:text-sm" />
                <span className="text-slate-700 text-xs sm:text-sm font-medium truncate">{skill.name}</span>
              </div>
              <div className="relative h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"
                  style={{ width: `${skill.level}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20"></div>
                </div>
              </div>
              <span className="text-teal-600 text-[10px] sm:text-xs mt-1 block text-right">{skill.level}%</span>
            </div>
          );
        })}
      </div>
      </div>

      {/* Right Column - Categories & Stats */}
      <div className="col-span-1 lg:col-span-5 flex flex-col gap-3 sm:gap-4">
      {/* Category Performance */}
      <div className="bg-white rounded-2xl border border-teal-100 shadow-lg p-4 sm:p-5">
        <h3 className="text-slate-800 font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-xs sm:text-sm uppercase tracking-wider text-teal-700">
          <FiCpu className="text-teal-600 text-sm sm:text-base" />
          Stack Performance
        </h3>
        
        <div className="space-y-2 sm:space-y-3">
          {skillCategories.map((cat, index) => (
            <div key={index}>
              <div className="flex justify-between text-[10px] sm:text-xs mb-1">
                <span className="text-slate-600 truncate">{cat.name}</span>
                <span className="text-teal-600 font-medium ml-2">{cat.value}%</span>
              </div>
              <div className="h-1.5 sm:h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full bg-gradient-to-r ${cat.color}`}
                  style={{ width: `${cat.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-2xl border border-teal-100 shadow-lg p-4 sm:p-5 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2 sm:gap-3">
          <div className="bg-slate-50 rounded-xl p-2 sm:p-3 text-center border border-slate-100">
            <div className="text-xl sm:text-2xl font-bold text-teal-700">1+</div>
            <div className="text-[10px] sm:text-xs text-slate-500">Years Exp</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-2 sm:p-3 text-center border border-slate-100">
            <div className="text-xl sm:text-2xl font-bold text-teal-700">20+</div>
            <div className="text-[10px] sm:text-xs text-slate-500">Projects</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-2 sm:p-3 text-center border border-slate-100">
            <div className="text-xl sm:text-2xl font-bold text-teal-700">5+</div>
            <div className="text-[10px] sm:text-xs text-slate-500">Clients</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-2 sm:p-3 text-center border border-slate-100">
            <div className="text-xl sm:text-2xl font-bold text-teal-700">100%</div>
            <div className="text-[10px] sm:text-xs text-slate-500">Satisfaction</div>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
    </section>
  );
};

export default Resume;
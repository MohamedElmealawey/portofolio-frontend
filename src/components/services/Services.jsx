import React from 'react';
import { FiCode, FiLayout, FiServer, FiDatabase, FiSmartphone, FiCloud } from 'react-icons/fi';

const Services = () => {
  const services = [
    {
      id: 1,
      icon: FiCode,
      title: "Frontend Development",
      description: "Building responsive and interactive user interfaces with React, Next.js, and modern CSS frameworks.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      icon: FiServer,
      title: "Backend Development",
      description: "Creating scalable server-side applications with Node.js, Express, and RESTful APIs.",
      color: "from-teal-500 to-green-500"
    },
    {
      id: 3,
      icon: FiDatabase,
      title: "Database Design",
      description: "Designing efficient database schemas with MongoDB, PostgreSQL, and Firebase.",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      icon: FiLayout,
      title: "UI/UX Implementation",
      description: "Translating designs into pixel-perfect, accessible web applications.",
      color: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      icon: FiSmartphone,
      title: "Responsive Design",
      description: "Ensuring seamless experiences across all devices and screen sizes.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: 6,
      icon: FiCloud,
      title: "Cloud Deployment",
      description: "Deploying and managing applications on AWS, Vercel, and Netlify.",
      color: "from-amber-500 to-orange-500"
    }
  ];

  return (
    <section className="mt-10 flex items-center bg-slate-50" id="services">
      <div className="container-custom w-full">
        <h2 className="section-title">MY SERVICES</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id} 
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-teal-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
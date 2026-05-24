import React, { useContext, useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle } from 'react-icons/fi';
import { PortfolioContext } from '../../context/PortfolioContext';
import axios from "axios";
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading,setLoading]=useState(false);

  const  {BACKEND_URL}  = useContext(PortfolioContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactFormHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
  
    if (Object.values(formData).every(field => field)) {
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/contact/createContact`,
          formData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        
        setFormData({ name: '', email: '', subject: '', message: '' });
        toast.success(response.data.message);
        setLoading(false);
      } catch (error) {
        console.error('Error submitting form:', error.message);
        toast.error(error.message);
      }finally{
        setLoading(false);
      }
    } else {
      toast.warn('Please fill out all fields.');
    }
  };

  const contactInfo = [
    { icon: FiMail, label: 'EMAIL', value: 'mohamedawadaliawad96@gmail.com', href: 'mailto:mohammed.awaad@email.com' },
    { icon: FiPhone, label: 'PHONE', value: '+20 128 408 0103', href: 'tel:+201284080103' },
    { icon: FiMapPin, label: 'LOCATION', value: 'Cairo, Egypt', href: 'https://www.google.com/maps/place/Cairo,+Cairo+Governorate/@30.0596113,31.1760624,12z/data=!3m1!4b1!4m6!3m5!1s0x14583fa60b21beeb:0x79dfb296e8423bba!8m2!3d30.0444196!4d31.2357116!16zL20vMDF3MnY?entry=ttu&g_ep=EgoyMDI2MDUxNy4wIKXMDSoASAFQAw%3D%3D' }
  ];

  return (
    <section className="py-10 items-center bg-gradient-to-br from-slate-50 via-white to-teal-50" id="contact">
      <div className="container-custom w-full">
        <h2 className="section-title">GET IN TOUCH</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
          {/* Left side - Info */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-slate-800 mb-6">
              Let's work together
            </h3>
            
            <p className="text-lg text-slate-600 leading-relaxed">
              Have a project in mind? I'd love to hear about it. 
              Let's discuss how I can help bring your ideas to life.
            </p>

            {/* Contact info cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <a
                    key={index}
                    href={info.href}
                    target='_blank'
                    className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center group-hover:bg-teal-600 transition-colors duration-300">
                      <Icon className="text-2xl text-teal-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-teal-600 tracking-wider">{info.label}</span>
                      <p className="text-slate-800 font-medium">{info.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right side - Form */}
          <form onSubmit={contactFormHandler} className="bg-white rounded-3xl shadow-xl p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20 transition-all duration-300" 
                  placeholder="Your Name"
                />
              </div>
              <div>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20 transition-all duration-300" 
                  placeholder="Your Email"
                />
              </div>
            </div>
            
            <div>
              <input 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                type="text" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20 transition-all duration-300" 
                placeholder="Subject"
              />
            </div>
            
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20 transition-all duration-300 resize-none"
                placeholder="Your Message"
              ></textarea>
            </div>
            
            <button 
              type='submit' 
              className="w-full cursor-pointer py-4 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              {loading ? "Loading..." :<>
                <span>SEND MESSAGE</span>
                <FiSend className="group-hover:translate-x-1 transition-transform duration-300" />
              </>
              }
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
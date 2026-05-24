import React, { useContext, useEffect, useState } from 'react';
import { FiExternalLink, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import axios from 'axios';
import { FiCode } from 'react-icons/fi';
import { PortfolioContext } from '../../context/PortfolioContext';

const Portfolio = () => {
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const {BACKEND_URL}  = useContext(PortfolioContext);
  const [currPage, setCurrPage] = useState(1);
  const itemsPerPage = 6;

  const getWorkData = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/work/getall`);
      setItems(response.data.allWork);
      setAllItems(response.data.allWork);
    } catch (error) {
      console.error('Error fetching work data:', error);
    }
  };

  useEffect(() => {
    getWorkData();
  }, [BACKEND_URL]);

  const filterItem = (category) => {
    setActiveFilter(category);
    setCurrPage(1);
    if (category === 'all') {
      setItems(allItems);
    } else {
      const updatedItems = allItems.filter((ele) => ele.category === category);
      setItems(updatedItems);
    }
  };

  const getPaginationProducts = () => {
    const startIndex = (currPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items?.slice(startIndex, endIndex);
  };
  
  const totalPages = Math.ceil(items?.length / itemsPerPage);

  const filters = [
    { value: 'all', label: 'ALL' },
    { value: 'fullstack', label: 'FULL STACK' },
    { value: 'frontend', label: 'FRONT END' },
    { value: 'backend', label: 'BACK END' }
  ];

  return (
    <section className=" flex items-center py-10  bg-white" id="portfolio">
      <div className="container-custom w-full">
        <h2 className="section-title">RECENT PROJECTS</h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center  gap-3 mb-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => filterItem(filter.value)}
              className={`px-6 py-3 text-sm font-semibold tracking-wider rounded-full transition-all duration-300 ${
                activeFilter === filter.value
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30'
                  : 'bg-slate-100 text-slate-600 hover:bg-teal-100 hover:text-teal-600'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Work Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto custom-scrollbar p-4">
          {getPaginationProducts()?.map((ele) => (
          <div 
          key={ele._id} 
          className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
          <div className="relative overflow-hidden h-72">
          {/* Background Image */}
          <img 
            src={`${ele.images[0].url}`} 
            alt={ele.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Centered Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
            {/* Icon */}
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/20">
              <FiCode className="text-3xl text-white" />
            </div>
            
            {/* Title */}
            <h3 className="text-xl font-bold text-white text-center mb-2">
              {ele.title}
            </h3>
            
            {/* Category */}
            <span className="text-teal-300 text-sm font-medium mb-4">
              {ele.category}
            </span>
            
            {/* View Button */}
            <a 
              href={`/projectDetails/${ele._id}`} 
              rel="noopener noreferrer" 
              className="bg-white text-teal-600 px-6 py-2 rounded-full text-sm font-semibold hover:bg-teal-50 transition-all duration-300 flex items-center gap-2 group/btn"
            >
              <span>View Project</span>
              <FiExternalLink className="group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </div>
          </div>
          </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-3">
            <button
              disabled={currPage === 1}
              onClick={() => setCurrPage((prev) => prev - 1)}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
                currPage === 1
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-teal-600 text-white hover:bg-teal-700 hover:scale-110'
              }`}
            >
              <FiArrowLeft />
            </button>
            
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrPage(index + 1)}
                className={`w-10 h-10 rounded-full font-semibold transition-all duration-300 ${
                  currPage === index + 1
                    ? 'bg-teal-600 text-white scale-110 shadow-lg shadow-teal-600/30'
                    : 'bg-slate-100 text-slate-600 hover:bg-teal-100 hover:text-teal-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
            
            <button
              disabled={currPage === totalPages}
              onClick={() => setCurrPage((prev) => prev + 1)}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
                currPage === totalPages
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-teal-600 text-white hover:bg-teal-700 hover:scale-110'
              }`}
            >
              <FiArrowRight />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
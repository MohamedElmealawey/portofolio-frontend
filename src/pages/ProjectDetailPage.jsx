import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { 
  FiExternalLink, FiArrowLeft, FiCalendar, FiTag, FiCode, 
  FiCpu, FiStar, FiX, FiLoader, FiClock, FiInfo, FiGithub, 
  FiUsers, FiCheckCircle, FiClock as FiDuration, FiChevronLeft, 
  FiChevronRight, FiImage 
} from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import { PortfolioContext } from '../context/PortfolioContext';

const ProjectDetailPage = ({ onClose }) => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { id } = useParams();
  const { BACKEND_URL } = useContext(PortfolioContext);
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiCode },
    { id: 'technologies', label: 'Technologies', icon: FiCpu },
    { id: 'info', label: 'Project Info', icon: FiInfo }
  ];

  // Function to get all images - defined BEFORE useEffect
  const getAllImages = () => {
    if (item?.images && Array.isArray(item.images) && item.images.length > 0) {
      return item.images.map(img => {
        if (typeof img === 'object') {
          return img.url || img.secure_url || img.path || null;
        }
        return img;
      }).filter(url => url);
    }
    return [];
  };

  const getWorkData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/api/work/workDetails/${id}`);
      setItem(response.data.work);
      setError(null);
    } catch (error) {
      console.error('Error fetching work data:', error);
      setError(error.response?.data?.message || 'Failed to load project details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id && BACKEND_URL) {
      getWorkData();
    }
  }, [id, BACKEND_URL]);

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Get category badge color
  const getCategoryColor = (category) => {
    const colors = {
      frontend: 'bg-blue-100 text-blue-700',
      backend: 'bg-green-100 text-green-700',
      fullstack: 'bg-purple-100 text-purple-700',
      mobile: 'bg-orange-100 text-orange-700',
      ecommerce: 'bg-teal-100 text-teal-700',
      portfolio: 'bg-pink-100 text-pink-700',
      dashboard: 'bg-indigo-100 text-indigo-700',
      devops: 'bg-red-100 text-red-700',
      database: 'bg-yellow-100 text-yellow-700'
    };
    return colors[category?.toLowerCase()] || 'bg-teal-100 text-teal-700';
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    const icons = {
      frontend: '🎨',
      backend: '⚙️',
      fullstack: '🔄',
      mobile: '📱',
      ecommerce: '🛒',
      portfolio: '💼',
      dashboard: '📊',
      devops: '🚀',
      database: '🗄️'
    };
    return icons[category?.toLowerCase()] || '💻';
  };

  // Get status badge color
  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 text-green-700',
      'in-progress': 'bg-yellow-100 text-yellow-700',
      planned: 'bg-blue-100 text-blue-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  // Get status icon
  const getStatusIcon = (status) => {
    const icons = {
      completed: <FiCheckCircle className="text-xs" />,
      'in-progress': <FiLoader className="text-xs" />,
      planned: <FiCalendar className="text-xs" />
    };
    return icons[status] || <FiInfo className="text-xs" />;
  };

  // Define allImages AFTER item is loaded
  const allImages = getAllImages();
  const hasMultipleImages = allImages.length > 1;

  // Navigation functions - defined after allImages
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % allImages.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + allImages.length) % allImages.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  // Auto-play slideshow effect - now after allImages is defined
  useEffect(() => {
    let interval;
    if (isAutoPlaying && hasMultipleImages && allImages.length > 1) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % allImages.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, hasMultipleImages, allImages.length]);

  // Reset current slide when item changes
  useEffect(() => {
    setCurrentSlide(0);
    setIsAutoPlaying(true);
  }, [item]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
        <div className="text-center">
          <FiLoader className="animate-spin text-4xl text-teal-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading project details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-2xl border border-red-100 shadow-lg">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Error Loading Project</h2>
          <p className="text-slate-600 mb-4">{error}</p>
          <Link 
            to="/"
            className="inline-block px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  // If no item found
  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-800 mb-2">Project Not Found</h2>
          <p className="text-slate-600 mb-4">The project you're looking for doesn't exist.</p>
          <Link 
            to="/"
            className="inline-block px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      {/* Header with back button */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-teal-100">
        <div className="container mx-auto px-4 py-4">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors group"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Projects</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getCategoryColor(item.category)}`}>
              <span>{getCategoryIcon(item.category)}</span>
              <span>{item.category?.charAt(0).toUpperCase() + item.category?.slice(1)}</span>
            </span>
            {item.status && (
              <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(item.status)}`}>
                {getStatusIcon(item.status)}
                <span>{item.status?.charAt(0).toUpperCase() + item.status?.slice(1)}</span>
              </span>
            )}
            {item.createdAt && (
              <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium flex items-center gap-1">
                <FiCalendar className="text-xs" />
                {formatDate(item.createdAt)}
              </span>
            )}
            {item.updatedAt && item.updatedAt !== item.createdAt && (
              <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium flex items-center gap-1">
                <FiClock className="text-xs" />
                Updated: {formatDate(item.updatedAt)}
              </span>
            )}
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            {item.title}
          </h1>
          
          <p className="text-lg text-slate-600 max-w-3xl">
            {item.description}
          </p>
        </div>

        {/* Image Slideshow */}
        {allImages.length > 0 && (
          <div className="mb-8">
            <div className="relative group grid grid-cols-12 gap-2">
              {/* Main Slideshow Container */}
              <div className="relative col-span-8 rounded-2xl overflow-hidden border border-teal-100 shadow-lg bg-black">
                <div className="relative w-full h-[450px]">
                  {allImages.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${item.title} - Image ${index + 1}`}
                        className="w-full h-full object-contain cursor-pointer"
                        onClick={() => setSelectedImage(image)}
                      />
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <FiChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <FiChevronRight size={24} />
                    </button>

                    {/* Play/Pause Button */}
                    <button
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                      className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white px-3 py-1.5 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      {isAutoPlaying ? 'Pause' : 'Play'}
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {hasMultipleImages && (
                  <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1.5 rounded-lg text-sm">
                    {currentSlide + 1} / {allImages.length}
                  </div>
                )}
              </div>

              {/* Thumbnail Navigation */}
              {hasMultipleImages && allImages.length > 1 && (
                <div className="flex flex-wrap gap-2 col-span-4  py-4 px-1 w-full h-fit">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`relative gap-3 w-30 h-30 rounded-lg  border-2 transition-all ${
                        index === currentSlide
                          ? 'border-teal-500 shadow-lg overflow-hidden scale-105'
                          : 'border-gray-600 overflow-hidden opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          {item.url && (
            <a 
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all shadow-lg hover:shadow-xl"
            >
              <FiExternalLink />
              Visit Live Project
            </a>
          )}
          {item.githubUrl && (
            <a 
              href={item.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-all shadow-lg"
            >
              <FiGithub />
              View Source Code
            </a>
          )}
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-teal-100 mb-6">
          <div className="flex gap-6 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 pb-3 px-1 transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-b-2 border-teal-600 text-teal-600'
                      : 'text-slate-500 hover:text-teal-600'
                  }`}
                >
                  <Icon className="text-sm" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="bg-white rounded-2xl border border-teal-100 shadow-lg p-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <FiCode className="text-teal-600" />
                  Project Overview
                </h3>
                
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {item.description}
                  </p>
                </div>

                {/* Project Details Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-start gap-3">
                    <FiTag className="text-teal-600 mt-1" />
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider">Category</p>
                      <p className="text-sm font-medium text-slate-700 mt-1">
                        {item.category?.charAt(0).toUpperCase() + item.category?.slice(1)}
                      </p>
                    </div>
                  </div>
                  
                  {item.status && (
                    <div className="flex items-start gap-3">
                      <FiCheckCircle className="text-teal-600 mt-1" />
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider">Status</p>
                        <p className="text-sm font-medium text-slate-700 mt-1">
                          {item.status?.charAt(0).toUpperCase() + item.status?.slice(1)}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {item.duration && (
                    <div className="flex items-start gap-3">
                      <FiDuration className="text-teal-600 mt-1" />
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider">Duration</p>
                        <p className="text-sm font-medium text-slate-700 mt-1">{item.duration}</p>
                      </div>
                    </div>
                  )}
                  
                  {item.teamSize && (
                    <div className="flex items-start gap-3">
                      <FiUsers className="text-teal-600 mt-1" />
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider">Team Size</p>
                        <p className="text-sm font-medium text-slate-700 mt-1">{item.teamSize} member{item.teamSize > 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-3">
                    <FiCalendar className="text-teal-600 mt-1" />
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider">Published</p>
                      <p className="text-sm font-medium text-slate-700 mt-1">
                        {formatDate(item.createdAt)}
                      </p>
                    </div>
                  </div>
                  
                  {item.url && (
                    <div className="flex items-start gap-3">
                      <FiExternalLink className="text-teal-600 mt-1" />
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider">Project URL</p>
                        <a 
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-teal-600 hover:text-teal-700 mt-1 inline-block break-all"
                        >
                          {item.url?.length > 40 ? item.url.substring(0, 40) + '...' : item.url}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'technologies' && (
              <div className="bg-white rounded-2xl border border-teal-100 shadow-lg p-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <FiCpu className="text-teal-600" />
                  Technologies Used
                </h3>
                
                {item.technologies && item.technologies.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg text-sm font-medium border border-teal-200 hover:bg-teal-100 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-sm">No technologies specified</p>
                )}
              </div>
            )}

            {activeTab === 'info' && (
              <div className="bg-white rounded-2xl border border-teal-100 shadow-lg p-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <FiInfo className="text-teal-600" />
                  Project Information
                </h3>
                
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Project Title</p>
                    <p className="text-slate-800 font-medium">{item.title}</p>
                  </div>
                  
                  <div className="border-b border-slate-100 pb-3">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Category</p>
                    <p className="text-slate-800">{item.category?.charAt(0).toUpperCase() + item.category?.slice(1)}</p>
                  </div>
                  
                  {item.status && (
                    <div className="border-b border-slate-100 pb-3">
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Status</p>
                      <p className="text-slate-800">{item.status?.charAt(0).toUpperCase() + item.status?.slice(1)}</p>
                    </div>
                  )}
                  
                  {item.duration && (
                    <div className="border-b border-slate-100 pb-3">
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Duration</p>
                      <p className="text-slate-800">{item.duration}</p>
                    </div>
                  )}
                  
                  {item.teamSize && (
                    <div className="border-b border-slate-100 pb-3">
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Team Size</p>
                      <p className="text-slate-800">{item.teamSize} member{item.teamSize > 1 ? 's' : ''}</p>
                    </div>
                  )}
                  
                  <div className="border-b border-slate-100 pb-3">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Created</p>
                    <p className="text-slate-800">{formatDate(item.createdAt)}</p>
                  </div>
                  
                  {item.updatedAt && item.updatedAt !== item.createdAt && (
                    <div className="border-b border-slate-100 pb-3">
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Last Updated</p>
                      <p className="text-slate-800">{formatDate(item.updatedAt)}</p>
                    </div>
                  )}
                  
                  {item.url && (
                    <div className="pb-3">
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Live URL</p>
                      <a 
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:text-teal-700 break-all text-sm"
                      >
                        {item.url}
                      </a>
                    </div>
                  )}
                  
                  {item.githubUrl && (
                    <div className="pb-3">
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">GitHub URL</p>
                      <a 
                        href={item.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:text-teal-700 break-all text-sm"
                      >
                        {item.githubUrl}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-teal-50 to-teal-100/50 rounded-2xl border border-teal-200 p-6 mb-6">
              <h4 className="font-semibold text-slate-800 mb-3">Quick Actions</h4>
              <div className="space-y-3">
                {item.url && (
                  <a 
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-lg text-sm hover:bg-teal-700 transition-colors"
                  >
                    <FiExternalLink />
                    Visit Live Project
                  </a>
                )}
                {item.githubUrl && (
                  <a 
                    href={item.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-700 text-white rounded-lg text-sm hover:bg-slate-800 transition-colors"
                  >
                    <FiGithub />
                    View Source Code
                  </a>
                )}
              </div>
            </div>

            {/* Share Section */}
            <div className="bg-white rounded-2xl border border-teal-100 shadow-lg p-6 mb-6">
              <h4 className="font-semibold text-slate-800 mb-3">Share this project</h4>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }}
                className="w-full px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm hover:bg-slate-200 transition-colors"
              >
                Copy Link
              </button>
            </div>

            {/* Project Stats */}
            {(item.duration || item.teamSize) && (
              <div className="bg-white rounded-2xl border border-teal-100 shadow-lg p-6">
                <h4 className="font-semibold text-slate-800 mb-3">Project Stats</h4>
                <div className="space-y-3">
                  {item.duration && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500">Duration</span>
                      <span className="text-sm font-medium text-teal-600">{item.duration}</span>
                    </div>
                  )}
                  {item.teamSize && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500">Team Size</span>
                      <span className="text-sm font-medium text-teal-600">{item.teamSize} members</span>
                    </div>
                  )}
                  {allImages.length > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500">Images</span>
                      <span className="text-sm font-medium text-teal-600 flex items-center gap-1">
                        <FiImage size={12} />
                        {allImages.length}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-teal-400 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <FiX size={32} />
          </button>
          <img 
            src={selectedImage} 
            alt="Full size view"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectDetailPage;
import React, { useState, useEffect } from 'react';
import { FiHome, FiBriefcase, FiUser, FiGrid, FiMail, FiMenu, FiX } from 'react-icons/fi';

const Sidebar = () => {
    const [toggle, setToggle] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            
            const sections = ['home', 'services', 'resume', 'portfolio', 'contact'];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { href: '#home', icon: FiHome, label: 'HOME' },
        { href: '#services', icon: FiBriefcase, label: 'SERVICES' },
        { href: '#resume', icon: FiUser, label: 'RESUME' },
        { href: '#portfolio', icon: FiGrid, label: 'WORK' },
        { href: '#contact', icon: FiMail, label: 'CONTACT' }
    ];

    return (
        <>
            <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
                scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
            }`}>
                <div className="container-custom">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <a href="#home" className="text-2xl font-bold text-teal-600">
                            MA<span className="text-slate-800">.</span>
                        </a>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:block">
                            <ul className="flex items-center space-x-2">
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <li key={item.href}>
                                            <a
                                                href={item.href}
                                                className={`relative px-5 py-2 flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                                                    activeSection === item.href.substring(1)
                                                        ? 'text-teal-600'
                                                        : 'text-slate-600 hover:text-teal-600'
                                                }`}
                                            >
                                                <Icon className="text-lg" />
                                                <span>{item.label}</span>
                                                {activeSection === item.href.substring(1) && (
                                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600"></span>
                                                )}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        {/* Contact Button */}
                        <a
                            href="#contact"
                            className="hidden md:block px-6 py-2.5 bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 transition-all duration-300 rounded-lg shadow-md hover:shadow-teal-600/30"
                        >
                            LET'S TALK
                        </a>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setToggle(!toggle)}
                            className="md:hidden w-12 h-12 flex items-center justify-center bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 transition-colors duration-300"
                        >
                            {toggle ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden absolute top-20 left-0 w-full bg-white border-t border-slate-200 shadow-xl transition-all duration-500 ${
                    toggle ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
                }`}>
                    <div className="container-custom py-6">
                        <nav>
                            <ul className="space-y-2">
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <li key={item.href}>
                                            <a
                                                href={item.href}
                                                onClick={() => setToggle(false)}
                                                className={`flex items-center gap-4 px-4 py-4 rounded-lg transition-all duration-300 ${
                                                    activeSection === item.href.substring(1)
                                                        ? 'bg-teal-50 text-teal-600'
                                                        : 'text-slate-600 hover:bg-slate-50'
                                                }`}
                                            >
                                                <Icon className="text-xl" />
                                                <span className="font-medium">{item.label}</span>
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        {/* Mobile Contact */}
                        <div className="mt-6 pt-6 border-t border-slate-200">
                            <a
                                href="#contact"
                                onClick={() => setToggle(false)}
                                className="flex items-center justify-center w-full px-4 py-4 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors duration-300"
                            >
                                LET'S TALK
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Sidebar;
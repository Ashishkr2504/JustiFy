import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import icon from '../assets/icon_3.jpg';

const Navbar = () => {
  const location = useLocation();

  const handleScrollToTop = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleScrollToFAQ = (e: React.MouseEvent) => {
    e.preventDefault();
    const faqSection = document.getElementById('faq-section');
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav style={{ backgroundColor: '#2E2E2E' }} className="text-white py-3 px-6 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between relative">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold flex items-center space-x-2" onClick={handleScrollToTop}>
          <img src={icon} alt="Logo" className="h-10 w-10 rounded-full" />
          <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, fontSize: '1.7rem' }}>JustiFy</span>
        </Link>

        {/* Center Navigation */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-6">
          <Link to="/" onClick={handleScrollToTop}>Home</Link>
          <Link to="/blog">Blog</Link>
          <a href="#faq-section" onClick={handleScrollToFAQ}>FAQ</a>
          <Link to="/contact">Contact Us</Link>
          <a href="#about-us-section" onClick={(e) => handleScrollToSection(e, 'about-us-section')}>About Us</a>
        </div>

        {/* Login / Register Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="flex items-center gap-2 bg-[#14532D] text-white font-semibold px-4 py-2 rounded-xl shadow hover:bg-[#1e3d25] hover:scale-105 transition-all duration-200"
          >
            <LogIn className="w-4 h-4" />
            Login
          </Link>
          <Link
            to="/register"
            className="flex items-center gap-2 bg-[#D97706] text-white font-semibold px-4 py-2 rounded-xl shadow hover:bg-[#b85d04] hover:scale-105 transition-all duration-200"
          >
            <UserPlus className="w-4 h-4" />
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

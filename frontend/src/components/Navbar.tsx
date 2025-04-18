import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { LogIn, UserPlus } from 'lucide-react';
import icon from '../assets/icon_3.jpg';
import '@fontsource/playfair-display/400.css' // Regular weight
import '@fontsource/playfair-display/700.css' 

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollToTop = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  
  const handleScrollToFAQ = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const faqSection = document.getElementById('faq-section');
      if (faqSection) {
        faqSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/?scrollTo=faq');
    }
  };
   // Scroll when redirected from another route
   useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollTo = params.get('scrollTo');
    if (scrollTo === 'faq') {
      const faqSection = document.getElementById('faq-section');
      if (faqSection) {
        setTimeout(() => {
          faqSection.scrollIntoView({ behavior: 'smooth' });
        }, 300); // slight delay for page render
      }
    }
  }, [location]);
  

  return (
    <nav style={{ backgroundColor: '#2E2E2E' }} className="text-white py-3 px-6 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between relative">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold flex items-center space-x-2" onClick={handleScrollToTop}>
          <img src={icon} alt="Logo" className="h-10 w-10 rounded-full" />
          <h5 className="text-4xl font-extrabold  tracking-wide text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
          JustiFy
        </h5>
        </Link>

        {/* Center Navigation */}
       {/* Center Navigation */}
<div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-6">
  <Link
    to="/"
    onClick={handleScrollToTop}
    className="hover:text-[#D97706] transition-colors duration-200"
  >
    Home
  </Link>
  <Link
    to="/blog"
    className="hover:text-[#D97706] transition-colors duration-200"
  >
    Blog
  </Link>
  <a
    href="#faq-section"
    onClick={handleScrollToFAQ}
    className="hover:text-[#D97706] transition-colors duration-200"
  >
    FAQ
  </a>
  <Link
    to="/contact"
    className="hover:text-[#D97706] transition-colors duration-200"
  >
    Contact Us
  </Link>
 
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

import React from 'react'
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react'
import animationData from '../assets/hp-anime.json'
import '@fontsource/playfair-display/400.css' // Regular weight
import '@fontsource/playfair-display/700.css' // Bold weight (optional)

const HeroSection = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGetStarted = () => {
    navigate('/register'); // Redirect to the Register page
  };
  return (
    <section className="w-full h-[500px] flex flex-col md:flex-row items-center justify-between bg-[#FFFAF0] px-15 py-10">
      {/* Text Section */}
      <div className="flex flex-col justify-center max-w-xl text-center md:text-left">
        <h1 className="text-6xl font-extrabold mb-19  tracking-wide text-[#2E2E2E]" style={{ fontFamily: '"Playfair Display", serif' }}>
          Welcome to JustiFy
        </h1>
        <p className="text-xl italic text-[#14532D] mb-6 ">
          Empowering every citizen with free instant access <br />
          to fair, AI-driven legal solutions.
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-white font-semibold w-60 py-2 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
        >
          Get Started
        </button>
      </div>

      {/* Animation Section */}
      <div className="w-[500px] hidden md:block">
        <Lottie animationData={animationData} loop={true} />
      </div>
    </section>
  )
}

export default HeroSection

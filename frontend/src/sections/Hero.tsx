import React from 'react'
import Lottie from 'lottie-react'
import animationData from '../assets/hp-anime.json'
import '@fontsource/playfair-display/400.css' // Regular weight
import '@fontsource/playfair-display/700.css' // Bold weight (optional)

const HeroSection = () => {
  return (
    <section className="w-full h-[500px] flex flex-col md:flex-row items-center justify-between bg-[#FFFAF0] px-15 py-10">
      {/* Text Section */}
      <div className="flex flex-col justify-center max-w-xl text-center md:text-left">
        <h1 className="text-5xl font-extrabold mb-19  tracking-wide text-[#2E2E2E]" style={{ fontFamily: '"Playfair Display", serif' }}>
          Welcome to JustiFy
        </h1>
        <p className="text-xl italic text-[#14532D] mb-6 ">
        Empowering every citizen with free instant access <br />
        to fair, AI-driven legal solutions.
        </p>
        <button className="bg-[#D97706]  text-white w-60 py-2 rounded-md hover:bg-[#b45309] transition">
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

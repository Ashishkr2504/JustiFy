import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaBolt, FaGlobe, FaCommentsDollar } from 'react-icons/fa';
import '@fontsource/playfair-display/400.css'
import '@fontsource/playfair-display/700.css'

const features = [
  {
    title: 'Reliable',
    description: 'Get accurate, AI-driven legal solutions that you can trust, 24/7.',
    icon: <FaShieldAlt size={28} className="text-[#14532D]" />,
  },
  {
    title: 'Efficient',
    description: 'Experience fast and reliable services, making legal processes seamless.',
    icon: <FaBolt size={28} className="text-[#14532D]" />,
  },
  {
    title: 'Accessible',
    description: 'Connect with legal support anytime, anywhere — right at your fingertips.',
    icon: <FaGlobe size={28} className="text-[#14532D]" />,
  },
  {
    title: 'Free & Smarter',
    description: 'Unlike basic chatbots, JustiFy offers intelligent legal support — absolutely free.',
    icon: <FaCommentsDollar size={28} className="text-[#14532D]" />,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-[#FFFAF0] py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl font-extrabold tracking-wide text-[#2E2E2E] mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
          Why Choose Us
        </h2>
        <p className="text-xl italic text-[#14532D] mb-12">
          Accessible. Intelligent. Trusted. JustiFy is Justice, Reinvented.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="bg-white border border-[#2E2E2E] p-6 rounded-lg shadow-md  hover:bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:text-white transition duration-100 flex flex-col items-start"
            >
              <div className="flex items-center gap-3 mb-2">
                {feature.icon}
                <h3 className="text-lg font-semibold text-[#14532D] mb-2">{feature.title}</h3>
              </div>
              <p className="text-sm text-[#2E2E2E] mt-1">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

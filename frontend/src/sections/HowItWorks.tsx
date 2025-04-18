import React, { useState } from 'react';
import '@fontsource/playfair-display/400.css' // Regular weight
import '@fontsource/playfair-display/700.css' // Bold weight (optional)
import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';
import {
  FaGavel,
  FaFileAlt,
  FaSearch,
  FaBalanceScale,
  FaMapMarkerAlt,
} from 'react-icons/fa';

type Step = {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
  image: string;
};

const steps: Step[] = [
  {
    id: 1,
    title: 'Receive Legal Advice',
    description: 'Get AI-powered insights on your legal queries instantly.',
    icon: <FaGavel size={24} className="text-[#14532D] group-hover:rotate-12 group-hover:scale-110 group-hover:text-[#D97706] transition-transform duration-300" />,
    image: 'src/assets/section2_img1.jpg',
  },
  {
    id: 2,
    title: 'Access Legal Templates',
    description: 'Use ready-to-go legal templates tailored for your needs.',
    icon: <FaFileAlt size={24} className="text-[#14532D] group-hover:rotate-12 group-hover:scale-110 group-hover:text-[#D97706] transition-transform duration-300" />,
    image: 'src/assets/section2_img2.jpg',
  },
  {
    id: 3,
    title: 'Analyze Your Documents',
    description: 'Upload documents to get intelligent insights and analysis.',
    icon: <FaSearch size={24} className="text-[#14532D] group-hover:rotate-12 group-hover:scale-110 group-hover:text-[#D97706] transition-transform duration-300" />,
    image: 'src/assets/section2_img3.jpg',
  },
  {
    id: 4,
    title: 'Track Your Case',
    description: 'Monitor your legal proceedings and get real-time updates.',
    icon: <FaBalanceScale size={24} className="text-[#14532D] group-hover:rotate-12 group-hover:scale-110 group-hover:text-[#D97706] transition-transform duration-300" />,
    image: 'src/assets/section2_img4.jpg',
  },
  {
    id: 5,
    title: 'Legal Assistance On-the-Go',
    description: 'Find nearby legal professionals and services based on your loaction.',
    icon: <FaMapMarkerAlt size={24} className="text-[#14532D] group-hover:rotate-12 group-hover:scale-110 group-hover:text-[#D97706] transition-transform duration-300" />,
    image: 'src/assets/section2_img5.jpg',
  },
];

const HowItWorks = () => {
  const [selectedId, setSelectedId] = useState<number>(1);
  const selectedStep = steps.find((step) => step.id === selectedId);

  return (
    <section className="bg-[#D6BFAA] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3  className="text-5xl font-extrabold  mb-4 tracking-wide text-[#2E2E2E]" style={{ fontFamily: '"Playfair Display", serif' }}>How JustiFy Works</h3>
          <p className="text-xl italic text-[#14532D]">
            Get legal assistance in just a few steps — simple, fast, and secure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Animated Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedStep?.id}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="w-full flex justify-center"
            >
              <img
                src={selectedStep?.image}
                alt={selectedStep?.title}
                className="w-[400px] max-h-[400px] rounded-xl shadow-xl border border-[#2E2E2E]/20"
              />
            </motion.div>
          </AnimatePresence>

          {/* Feature Boxes */}
          <div className="space-y-4">
            {steps.map((step) => (
              <motion.div
                key={step.id}
                onClick={() => setSelectedId(step.id)}
                whileTap={{ scale: 0.97 }}
                animate={{
                  scale: step.id === selectedId ? 1.03 : 1,
                  rotateX: step.id === selectedId ? 5 : 0,
                  rotateY: step.id === selectedId ? 5 : 0,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`group cursor-pointer rounded-lg p-5 flex items-start gap-4 border-2
                  ${
                    step.id === selectedId
                      ? 'border-[#14532D] bg-[#FFFAF0] shadow-2xl'
                      : 'border-[#2E2E2E]/20 hover:border-[#D97706] hover:bg-[#FFFAF0]/50'
                  }`}
              >
                {step.icon}
                <div>
                  <h4 className="text-lg font-semibold text-[#2E2E2E] mb-1">{step.title}</h4>
                  <p className="text-sm text-[#2E2E2E]/80">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

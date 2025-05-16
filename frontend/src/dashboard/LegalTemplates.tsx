import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { FileText } from 'lucide-react';

import { useState, useEffect } from 'react';

const templates = [
  { type: 'rent-agreement', label: 'Rent Agreement' },
  { type: 'loan-agreement', label: 'Loan Agreement' },
  { type: 'loan-agreement-security', label: 'Loan Agreement with Security' },
  { type: 'cheque-bounce-notice', label: 'Cheque Bounce Notice' },
  { type: 'legal-notice', label: 'Legal Notice' },
  { type: 'simple-money-bond', label: 'Simple Money Bond' },
  { type: 'bond-bail-bond', label: 'Bond & Bail Bond (CrPC)' },
  { type: 'employee-bond-noncompete', label: 'Employee Bond of Non-Compete' },
  { type: 'performance-bond', label: 'Performance Bond (Contract)' },
  { type: 'security-bond-surety', label: 'Security Bond by a Surety' },
  { type: 'security-bond-succession', label: 'Security Bond for Succession Certificate' },
  { type: 'leave-license-agreement', label: 'Leave and License Agreement' },
  { type: 'simple-mortgage-deed', label: 'Simple Mortgage Deed' },
  { type: 'agreement-sale-house', label: 'Agreement for Sale of a House' },
  { type: 'independent-contractor-agreement', label: 'Independent Contractor Agreement' },
  { type: 'shareholders-agreement', label: 'Shareholders Agreement' },
  { type: 'joint-venture-shareholders-agreement', label: 'Joint Venture/Shareholders Agreement' },
  { type: 'memorandum-of-understanding', label: 'Memorandum of Understanding (MOU)' },
  { type: 'franchise-agreement', label: 'Franchise Agreement' },
  { type: 'employee-service-agreement', label: 'Employee Service Agreement' },
  { type: 'confidential-nda', label: 'Confidential & Non-Disclosure Agreement (NDA)' },
  { type: 'business-service-agreement', label: 'Business Service Agreement' },
  { type: 'partnership-agreement', label: 'Partnership Agreement' },
  { type: 'retainership-agreement', label: 'Retainership Agreement' },
  { type: 'deed-of-guarantee', label: 'Deed of Guarantee' },
  { type: 'agreement-for-sale', label: 'Agreement for Sale' },
  { type: 'affidavit-indemnity', label: 'Affidavit and Indemnity' },
  
  // Add more templates as needed
];

function TypewriterHeading({
  text,
  speed = 50,
  pause = 1200,
}: {
  text: string;
  speed?: number;
  pause?: number;
}) {
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + text[index]);
        setIndex((i) => i + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayed('');
        setIndex(0);
      }, pause);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed, pause]);

  return (
<h2
  className="text-3xl md:text-3xl text-center font-bold tracking-tight bg-gradient-to-r from-[#14532D] to-lime-600 bg-clip-text text-transparent drop-shadow-lg min-h-[2.5em]"
>
  {displayed}
  <span className="animate-pulse text-lime-700">|</span>
</h2>
  );
}

export default function LegalTemplates() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  return (
    <div className="px-9">
      <h2
        className="text-4xl font-extrabold mb-6 tracking-wide text-[#2E2E2E]"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        Hey there, welcome to your <br />
        Dashboard!
      </h2>
      <p className="text-xl italic text-[#14532D] mb-6">
        You've just unlocked your personal legal toolkit. <br />
        Dive in and make justice easy!
      </p>
      <motion.div
        className="relative bg-[#FFFAF0] p-6 rounded-2xl shadow w-full max-w-6xl mx-auto min-h-[43vh] mb-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center">
          <TypewriterHeading text="Pick a Legal Template That Works for You" />
        </div>
        <div className="relative w-1/3 mb-6">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search Legal Templates..."
            className="w-full px-4 py-2 rounded border border-orange-400 bg-orange-100 text-[#2E2E2E] focus:outline-none focus:ring-2 focus:ring-orange-500 transition pr-10"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-500 pointer-events-none">
            <Search size={20}  />
          </span>
        </div>
        <div className="flex flex-wrap gap-6 justify-center mt-10 mb-5">
          {templates
            .filter(t =>
              t.label.toLowerCase().includes(search.toLowerCase()) ||
              t.type.toLowerCase().includes(search.toLowerCase())
            )
            .map(t => (
              <div
                key={t.type}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col items-center min-w-[220px] max-w-xs"
              >
                <FileText className="text-[#14532D] mb-2" size={32} />
                <button
                  className="bg-[#14532D] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1e3d25] hover:scale-105 hover:shadow-xl transition w-full cursor-pointer"
                  onClick={() => navigate(`/legal-templates/${t.type}`)}
                >
                  {t.label}
                </button>
              </div>
            ))}
        </div>
      </motion.div>
    </div>
  );
}
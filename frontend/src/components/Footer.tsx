import React from 'react';
import { Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#2E2E2E] text-[#FFFAF0] py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Logo + About */}
        <div className="flex flex-col">
          <div className="flex items-center mb-4">
            {/* Replace with your actual logo */}
            <img src="src/assets/icon_3.jpg" alt="JustiFy Logo" className="h-10 w-10 mr-2" />
            <h3 className="text-2xl font-bold text-white">JustiFy</h3>
          </div>
          <p className="text-sm text-[#FFFAF0]/80 leading-relaxed">
            Your AI-powered legal assistant — simplifying law, automating documents, and guiding you with confidence.
          </p>
        </div>

        {/* Help Center */}
        <div>
          <h4 className="text-lg font-semibold text-[#A7F3D0] mb-4">Help Center</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/privacy-policy" className="hover:text-[#D6BFAA] transition">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms-of-service" className="hover:text-[#D6BFAA] transition">Terms of Service</a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold text-[#A7F3D0] mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-[#A7F3D0]" />
              <a href="mailto:contact@justify.in" className="hover:text-[#D6BFAA] transition">
                contact@justify.in
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} className="text-[#A7F3D0]" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} className="text-[#A7F3D0]" />
              <span>+91 91234 56789</span>
            </li>
            <li className="mt-2">New Delhi, India</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-[#FFFAF0]/60 mt-10">
        © {new Date().getFullYear()} JustiFy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

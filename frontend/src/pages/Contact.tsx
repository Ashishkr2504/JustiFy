import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone } from 'react-icons/fi';

const Contact = () => {
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setStatus(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const res = await fetch('http://localhost:5000/api/contact/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus({ type: 'success', message: '✅ Your message has been sent successfully!' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', message: '❌ Something went wrong. Please try again later.' });
      }
    } catch {
      setStatus({ type: 'error', message: '❌ Something went wrong. Please try again later.' });
    }

    setIsSending(false);
    setTimeout(() => setStatus(null), 4000);
  };


  return (
    <section className="min-h-screen bg-gradient-to-br from-[#D6BFAA] via-[#FFFAF0] to-[#A7F3D0] flex items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-8">
        {/* Left Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex w-1/2 h-full justify-center items-center"
        >
          <img
            src="src/assets/contact_img.png"
            alt="Contact Illustration"
            className="w-full h-full object-contain "
          />
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 bg-white rounded-xl shadow-lg p-8 mt-15 ml-30"
        >
          <h2 className="text-4xl font-bold text-[#2E2E2E] mb-4 text-center" style={{ fontFamily: '"Playfair Display", serif' }}>
            Connect With JustiFy


          </h2>
          <p className="text-center text-[#2E2E2E] mb-6">We’re here to help. Let’s connect!</p>

          {/* Icons */}
          <div className="flex items-center justify-center gap-8 mb-6 text-[#14532D]">
            <div className="flex items-center gap-2">
              <FiMail className="text-xl" />
              <span className="text-sm">help@justify.in</span>
            </div>
            <div className="flex items-center gap-2">
              <FiPhone className="text-xl" />
              <span className="text-sm">+91 9876543210</span>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-[#2E2E2E] font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#14532D]/40 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14532D]"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm text-[#2E2E2E] font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#14532D]/40 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14532D]"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label className="block text-sm text-[#2E2E2E] font-medium mb-1">Message</label>
              <textarea
                name="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#14532D]/40 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14532D]"
                placeholder="Your message..."
              />
            </div>

            {status && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-md text-sm text-center font-medium ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
              >
                {status.message}
              </motion.div>
            )}


<button
  type="submit"
  disabled={isSending}
  className={`w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-white font-semibold py-2 rounded-lg shadow-lg transition-transform duration-300 ease-in-out cursor-pointer ${
    isSending ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-xl hover:scale-105'
  }`}
>
{isSending ? (
  <>
    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    Sending...
  </>
) : (
  'Send Message'
)}

</button>


          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

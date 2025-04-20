import { useState } from 'react';
import { motion } from 'framer-motion';
import { SendHorizonal, UserRound, Bot } from 'lucide-react';
import { getChatbotResponse } from '../services/chatbot.api';

const Chatbot = () => {
  const [query, setQuery] = useState('');
  const [chat, setChat] = useState<{ question: string; answer: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const response = (await getChatbotResponse(query)) as { answer: string };
      setChat([...chat, { question: query, answer: response.answer }]);
      setQuery('');
    } catch (error: any) {
      console.error(error);
      alert(error || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

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
        Dive in and make justice easy!
      </p>

      <motion.div
        className="bg-[#FFFAF0] p-6 rounded-2xl shadow w-full max-w-6xl mx-auto min-h-[60vh] mb-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-[#2E2E2E] text-center mb-4">
          What can I help with?
        </h2>
        <div className="space-y-4">
          {chat.map((entry, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-[#14532D] font-semibold">
                <UserRound size={20} />
                <span>You:</span>
              </div>
              <p className="mb-2 text-[#2E2E2E]">{entry.question}</p>
              <div className="flex items-center gap-2 text-[#D97706] font-semibold">
                <Bot size={20} />
                <span>JustiFy Bot:</span>
              </div>
              <p className="text-[#2E2E2E] whitespace-pre-line">{entry.answer}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="bg-[#FFFAF0] p-6 rounded-2xl shadow w-full max-w-6xl mx-auto min-h-[10vh] mb-18"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your legal query..."
            className="flex-grow p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14532D]"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-[#D97706] hover:bg-[#b86105] text-white px-5 py-2 rounded-xl font-semibold transition-all cursor-pointer flex items-center gap-2"
          >
            {isLoading ? 'Loading...' : 'Send'}
            <SendHorizonal size={18} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Chatbot;

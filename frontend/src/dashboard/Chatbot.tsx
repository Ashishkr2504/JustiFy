import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SendHorizonal, UserRound, Bot, Scale, Target, ListCheck,  ChevronDown ,ChevronUp } from 'lucide-react';
import { getChatbotResponse } from '../services/chatbot.api';
import { useChat } from '../context/ChatContext';

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

const SkeletonSection = ({ width = "100%", height = "1.2em", className = "" }) => (
  <div
    className={`bg-gray-200 rounded animate-pulse mb-2 ${className}`}
    style={{ width, height }}
  />
);
function renderFormattedText(text: string) {
  // Replace **bold** with <span class="font-bold text-[#14532D]">
  const boldReplaced = text.replace(/\*\*(.*?)\*\*/g, '<span class="font-semibold text-black">$1</span>');
  // Replace * bullet points with <li>
  if (boldReplaced.includes('\n* ')) {
    return (
      <ul className="list-disc ml-6 space-y-2">
        {boldReplaced.split('\n').map((line, idx) =>
          line.startsWith('* ')
            ? <li key={idx} dangerouslySetInnerHTML={{ __html: line.slice(2) }} />
            : line.trim() && <div key={idx} dangerouslySetInnerHTML={{ __html: line }} className="mb-2" />
        )}
      </ul>
    );
  }
  // Otherwise, just render with bold
  return <span dangerouslySetInnerHTML={{ __html: boldReplaced }} />;
}
const Chatbot = () => {
  const { chat, setChat, isLoading, setIsLoading } = useChat();
  const [query, setQuery] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [expandedResults, setExpandedResults] = useState<{ [key: number]: boolean }>({});
  const chatTopRef = useRef<HTMLDivElement | null>(null);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);
  const pageTopRef = useRef<HTMLDivElement | null>(null);


  const handleSend = async () => {
    if (!query.trim() || isLoading) return;

    // Add placeholder entry for skeleton loader
    setChat((prev: { question: string; answer: string }[]) => [...prev, { question: query, answer: '' }]);
    setIsLoading(true);
    setQuery('');

    try {
      const response = (await getChatbotResponse(query)) as { answer: string };
      const answer = response.answer;
      // Update the last chat entry with the real answer
      setChat((prev: { question: string; answer: string }[]) => {
        const updated = [...prev];
        updated[updated.length - 1].answer = answer;
        return updated;
      });
    } catch (error: any) {
      // Optionally update the last chat entry with an error message
      setChat((prev: { question: string; answer: string }[]) => {
        const updated = [...prev];
        updated[updated.length - 1].answer = "Sorry, something went wrong.";
        return updated;
      });
      setErrorMsg(error || 'Something went wrong.');
      console.error(error);
      alert(error || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-9">
      <div ref={pageTopRef} />
      
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
        <div className="relative mb-6">
          <TypewriterHeading text="What can I help with?" />
          <button
            className="absolute top-0 right-0 bg-green-200 hover:bg-green-300 text-gray-700 p-1 rounded-full shadow transition ml-6"
            onClick={() => chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="Scroll to bottom"
            title="Scroll to bottom"
          >
            <ChevronDown size={23} />
          </button>
        </div>
        <div className="flex justify-between items-start mb-3">
          <div></div>
          <div className="flex flex-col items-end gap-2">
            
            {chat.length > 0 && (
              <button
                className="bg-red-200 hover:bg-red-300 text-red-700 px-4 py-1 rounded font-semibold text-sm transition cursor-pointer"
                onClick={() => setChat([])}
                aria-label="Clear all chats"
                title="Delete all chats"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
            
        {/* <div ref={chatTopRef} /> */}
        <div className="space-y-4">
          {chat.length === 0 && !isLoading && (
            <div className="text-center text-gray-400 italic py-8">
              Ask your first legal question to get started!
            </div>
          )}
          {chat.map((entry: { question: string; answer: string }, index: number) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm relative">
              {/* Delete button */}
              <button
                className="absolute top-2 right-2 bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded transition font-semibold text-sm cursor-pointer"
                onClick={() => {
                  setChat((prev: { question: string; answer: string }[]) =>
                    prev.filter((_, i) => i !== index)
                  );
                }}
                aria-label="Delete this chat"
                title="Delete this chat"
              >
                Delete
              </button>
              <div className="flex items-center gap-2 text-[#14532D] font-semibold">
                <UserRound size={20} />
                <span>You:</span>
              </div>
              <p className="mb-4 text-[#2E2E2E]">{entry.question}</p>
              <div className="flex items-center gap-2 text-[#D97706] font-semibold">
                <Bot size={20} />
                <span>JustiFy Bot:</span>
              </div>
              <div className="text-[#2E2E2E] whitespace-pre-line">
                {isLoading && index === chat.length - 1 ? (
                  <div>
                    <SkeletonSection width="80%" />
                    <SkeletonSection width="40%" />
                    <SkeletonSection width="60%" height="2em" />
                    <SkeletonSection width="50%" />
                  </div>
                ) : (() => {
                  let content = entry.answer;
                  try {
                    const data = typeof content === 'string' ? JSON.parse(content) : content;
                    return (
                      <div>
                        {/* 1. Legal Answer */}
                        {data.legal_answer && (
                          <div className="mb-3 mt-2">
                            {/* <br /> */}
                            <span className="flex items-center gap-2 font-bold text-[#14532D] "><Scale size={18} /> Legal Guidance:</span>
                            <div className="ml-2">   {renderFormattedText(data.legal_answer)}</div>
                          </div>
                        )}
                        {/* 2. Confidence Score */}
                        {data.confidence_score && (
                          <div className="mb-3">
                            <span className="flex items-center gap-2 font-semibold text-[#D97706]">
                              < Target size={18} /> Confidence:</span>
                            <span className="ml-2 text-base leading-relaxed">{data.confidence_score}</span>
                          </div>
                        )}
                        {/* 3. Top Results */}
                        {data.top_results && Array.isArray(data.top_results) && (
                          <div className="mb-3">
                            <span className="flex items-center gap-1 font-bold text-[#14532D]">
                              <ListCheck size={18} /> Top Results:
                            </span>
                            <div className="ml-6 space-y-2">
                              {data.top_results.map((item: string, idx: number) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <span className="font-semibold text-[black] min-w-[70px]">{`Result ${idx + 1}:`}</span>
                                  <span>
                                    {expandedResults[idx] ? (
                                      <>
                                        {item}
                                        <button
                                          className="ml-2 text-green-700 text-xs"
                                          onClick={() =>
                                            setExpandedResults((prev) => ({ ...prev, [idx]: false }))
                                          }
                                        >
                                          Read Less
                                        </button>
                                      </>
                                    ) : (
                                      <>
                                        {item.length > 180 ? item.slice(0, 180) + '...' : item}
                                        {item.length > 180 && (
                                          <button
                                            className="ml-2 text-green-700 text-xs"
                                            onClick={() =>
                                              setExpandedResults((prev) => ({ ...prev, [idx]: true }))
                                            }
                                          >
                                            Read More
                                          </button>
                                        )}
                                      </>
                                    )}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {/* 4. Disclaimer */}
                        {data.disclaimer && (
                          <div className="mt-3 text-[#D97706] italic">
                            ⚠️ {data.disclaimer}
                          </div>
                        )}
                      </div>
                    );
                  } catch {
                    return content;
                  }
                })()}
                {errorMsg && index === chat.length - 1 && (
                  <div className="text-red-600 mt-2">{errorMsg}</div>
                )}
              </div>
            </div>
          ))}
          <div ref={chatBottomRef}></div>
        </div>
        <button
            className=" absolute bottom-1 right-5 bg-green-200 hover:bg-green-300 text-gray-700 p-1 rounded-full shadow transition"
            onClick={() => pageTopRef.current?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="Scroll to top"
            title="Scroll to top"
          >
            <ChevronUp size={23} />
          </button>
      </motion.div>

      <motion.div
        className="bg-[#FFFAF0] p-6 rounded-2xl shadow w-full max-w-6xl mx-auto min-h-[10vh] mb-18"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex gap-4 items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setErrorMsg('');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder="Enter your legal query..."
            className="flex-grow p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14532D]"
            disabled={isLoading}
            aria-label="Enter your legal query"
          />
          <button
            aria-label="Send query"
            onClick={handleSend}
            disabled={isLoading}
            className="bg-[#D97706] hover:bg-[#b86105] text-white px-5 py-2 rounded-xl font-semibold transition-all cursor-pointer flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="loader mr-2"></span>
                One moment, preparing your legal guidance...
              </>
            ) : (
              <>
                Send
                <SendHorizonal size={18} />
              </>
            )}
          </button>
          
        </div>
      </motion.div>
    </div>
  );
};

export default Chatbot;
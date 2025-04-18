import React, { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'

const faqs = [
  {
    question: 'What is JustiFy?',
    answer:
      'JustiFy is an AI-powered legal assistance platform offering legal advice, document analysis, case tracking, and more to help you navigate your legal journey effortlessly.',
  },
  {
    question: 'Is my data secure on JustiFy?',
    answer:
      'Absolutely. We prioritize your privacy and ensure all your documents and queries are securely handled using the latest encryption technologies.',
  },
  {
    question: 'Can I consult a human lawyer?',
    answer:
      'Yes. JustiFy also allows you to connect with verified legal professionals for additional support beyond AI assistance.',
  },
  {
    question: 'Is JustiFy free to use?',
    answer:
      'Yes! Many of our features including legal advice and templates are completely free for students and individuals seeking help.',
  },
  {
    question: 'What types of documents can I analyze?',
    answer:
      'You can analyze contracts, affidavits, notices, agreements, and more. Just upload your file and get insights instantly.',
  },
  
  {
    question: 'How does the AI legal assistant work?',
    answer:
      'Our AI uses advanced algorithms to understand your queries and provide accurate legal information, document analysis, and personalized recommendations.',
  },
  {
    question: 'Can I track my legal cases?',
    answer:
      'Yes! JustiFy offers a case tracking feature that allows you to monitor the progress of your legal matters in real-time.',
  },
  {
    question: 'What if I have more questions?',
    answer:
      'Feel free to reach out to our support team via the contact form on our website. We are here to help!',
  },
  {
    question: 'Is JustiFy available in multiple languages?',
    answer:
      'Currently, JustiFy supports English and Hindi. You can change the language by clicking on the language icon in the bottom right corner.We are working on adding more languages to cater to a wider audience.',
  },
  
  {
    question: 'Is there a limit to the number of documents I can upload?',
    answer:
      'Currently, there is no limit on the number of documents you can upload. However, we recommend uploading one document at a time for optimal analysis.',
  },
  {
    question: 'Is there a mobile app for JustiFy?',
    answer:
      'Currently, JustiFy is accessible via web browsers. We are working on a mobile app to enhance your experience further. Stay tuned!',
  }
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id ="faq-section" className="bg-[#D6BFAA] py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-5xl font-extrabold tracking-wide text-[#2E2E2E] mb-5" style={{ fontFamily: '"Playfair Display", serif' }}>
          Frequently Asked Questions
        </h2>
        <p className="text-xl italic text-[#14532D] mb-10">
           Got questions? We’ve got your back with clear and simple answers.
          </p>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-[#2E2E2E] rounded-md bg-[#FFFAF0] transition-all duration-300"
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-[#A7F3D0]/40 transition"
              >
                <span className="text-lg font-semibold text-[#14532D]">{faq.question}</span>
                <FaChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180 text-[#D97706]' : 'rotate-0 text-[#2E2E2E]'
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-[#2E2E2E]/90 text-md">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ

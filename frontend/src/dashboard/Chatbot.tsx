import { useState } from 'react'
import { motion } from 'framer-motion'

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi there! How can I assist you today?' },
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim() === '') return

    // Add user message
    setMessages([...messages, { sender: 'user', text: input }])

    // Simulate bot response
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: 'Thank you for your query. I will get back to you shortly!' },
      ])
    }, 1000)

    setInput('') // Clear input
  }

  return (
    <motion.div
      className="flex flex-col h-[80vh] max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Chat Display */}
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 p-3 rounded-lg ${
              message.sender === 'bot'
                ? 'bg-gray-200 text-gray-800 self-start'
                : 'bg-blue-500 text-white self-end'
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </motion.div>
  )
}

export default Chatbot

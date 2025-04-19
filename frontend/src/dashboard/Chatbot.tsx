import { motion } from 'framer-motion'

const Chatbot = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-4">AI Legal Chatbot</h2>
      {/* your content */}
    </motion.div>
  )
}

export default Chatbot

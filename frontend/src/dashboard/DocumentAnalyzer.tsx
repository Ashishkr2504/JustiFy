import React from 'react'
import { motion } from 'framer-motion'
const DocumentAnalyzer = () => {
  return (
    <div className=" px-9">
  <h2 className="text-4xl font-extrabold mb-6  tracking-wide text-[#2E2E2E]" style={{ fontFamily: '"Playfair Display", serif' }}>
      Hey there, welcome to your <br />Dashboard!
  </h2>
  <p className="text-xl italic text-[#14532D] mb-6 ">
      You've just unlocked your personal legal toolkit.  <br />
      Dive in and make justice easy!
  </p>

  <motion.div className="bg-[#FFFAF0] p-6 rounded-2xl shadow w-full max-w-6xl mx-auto min-h-[60vh] mb-28"
    initial={{ opacity: 0, y: 40 }} 
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }} > 
    <h2 className="text-2xl font-bold text-[#2E2E2E] mb-4">Document Analyzer</h2> 
    <p className="text-gray-700">Analyze your legal document </p>
    <div className="mt-6 space-y-3">
      Upload a legal document for analysis. <br />
      <input type="file" accept=".pdf, .docx" className="border border-gray-300 rounded-lg p-2 w-full" />
      <button className="bg-[#14532D] text-white rounded-lg px-4 py-2 mt-4">Analyze Document</button>
      <p className="text-gray-700 mt-4">Results will be displayed here.</p>
    </div>
  </motion.div>
</div>
  
  )
}

export default DocumentAnalyzer

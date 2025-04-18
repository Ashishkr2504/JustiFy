import React from 'react'

const HowItWorks = () => {
  return (
    <section className="w-full bg-[#D6BFAA] py-16 px-6 text-[#2E2E2E]">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-4">How It Works</h2>
      <p className="text-lg mb-12 text-[#14532D]">
        Get legal assistance in just a few steps — simple, fast, and secure.
      </p>
  
      <div className="grid md:grid-cols-3 gap-8">
        {/* Step 1 */}
        <div className="bg-[#FFFAF0] p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <div className="text-3xl font-bold text-[#14532D] mb-2">1</div>
          <h3 className="text-xl font-semibold mb-2">Ask Your Query</h3>
          <p className="text-sm">Type your legal question and let the AI understand your need.</p>
        </div>
  
        {/* Step 2 */}
        <div className="bg-[#FFFAF0] p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <div className="text-3xl font-bold text-[#14532D] mb-2">2</div>
          <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
          <p className="text-sm">The system processes legal documents and laws for accurate guidance.</p>
        </div>
  
        {/* Step 3 */}
        <div className="bg-[#FFFAF0] p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <div className="text-3xl font-bold text-[#14532D] mb-2">3</div>
          <h3 className="text-xl font-semibold mb-2">Receive Legal Output</h3>
          <p className="text-sm">Get actionable suggestions, templates, or direct lawyer connect.</p>
        </div>
      </div>
    </div>
  </section>
  
  )
}

export default HowItWorks

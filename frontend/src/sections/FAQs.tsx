import React from 'react'

const FAQs = () => {
  return (
    <section id="faq-section" className="bg-gray-200 p-16">
      <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
      <div className="mt-8 space-y-6">
        <div>
          <h3 className="text-xl font-semibold">What is JustiFy?</h3>
          <p className="text-gray-600">JustiFy is an AI-powered platform offering legal assistance and services.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">How can I get legal help?</h3>
          <p className="text-gray-600">You can submit your legal queries or connect with an attorney through our platform.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">What legal services are available?</h3>
          <p className="text-gray-600">We provide legal templates, document analysis, case tracking, and more.</p>
        </div>
      </div>
    </section>
  )
}

export default FAQs

import React from 'react'

const WhyChooseUs = () => {
  return (
    <section className="bg-blue-100 p-16 text-center">
      <h2 className="text-3xl font-bold">Why Choose Us?</h2>
      <p className="text-lg mt-4">Here are a few reasons why JustiFy is the best choice for your legal needs.</p>
      <div className="mt-8 flex justify-center gap-8">
        <div className="w-1/3">
          <h3 className="text-xl font-semibold">Expert Advice</h3>
          <p className="text-gray-600">Our team of professionals offer reliable legal advice.</p>
        </div>
        <div className="w-1/3">
          <h3 className="text-xl font-semibold">Convenience</h3>
          <p className="text-gray-600">Access legal help from the comfort of your home.</p>
        </div>
        <div className="w-1/3">
          <h3 className="text-xl font-semibold">Affordable</h3>
          <p className="text-gray-600">We provide affordable legal services for everyone.</p>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs

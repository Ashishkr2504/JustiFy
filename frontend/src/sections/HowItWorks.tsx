import React from 'react'

const HowItWorks = () => {
  return (
    <section className="bg-gray-100 p-16 text-center">
      <h2 className="text-3xl font-bold">How It Works</h2>
      <p className="text-lg mt-4">Our platform simplifies the process of obtaining legal assistance with the following steps.</p>
      <div className="mt-8 flex justify-center gap-8">
        <div className="w-1/3">
          <h3 className="text-xl font-semibold">Step 1</h3>
          <p className="text-gray-600">Submit your legal queries.</p>
        </div>
        <div className="w-1/3">
          <h3 className="text-xl font-semibold">Step 2</h3>
          <p className="text-gray-600">Get automated advice or connect with a legal professional.</p>
        </div>
        <div className="w-1/3">
          <h3 className="text-xl font-semibold">Step 3</h3>
          <p className="text-gray-600">Use templates or track cases online.</p>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

import React from 'react'

const Contact = () => {
  return (
    <section className="p-8">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <form className="flex flex-col gap-4 max-w-md mx-auto">
        <input type="text" placeholder="Name" className="p-2 border" />
        <input type="email" placeholder="Email" className="p-2 border" />
        <textarea placeholder="Message" className="p-2 border" />
        <button type="submit" className="bg-blue-500 text-white py-2 rounded">Send</button>
      </form>
    </section>
  )
}

export default Contact

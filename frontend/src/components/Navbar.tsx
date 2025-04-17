import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">JustiFy</Link>
        <div className="space-x-4">
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

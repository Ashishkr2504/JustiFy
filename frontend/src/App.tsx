import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LanguageToggle from './components/LanguageToggle'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Blog from './pages/Blog'

const App = () => {
  return (
    <Router>
      <LanguageToggle />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App

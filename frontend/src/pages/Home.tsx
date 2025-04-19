import React from 'react'
import Hero from '../sections/Hero'
import HowItWorks from '../sections/HowItWorks'
import WhyChooseUs from '../sections/WhyChooseUs'
import FAQs from '../sections/FAQs'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/login'); // Redirect to login
  };

  return (
    <div>
      <Hero />
      <HowItWorks />
      <WhyChooseUs />
      <FAQs />
    </div>
  )
}

export default Home

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios'; // ✅ Import axios
import '@fontsource/playfair-display/400.css';
import '@fontsource/playfair-display/700.css';
import Lottie from 'lottie-react'
import loginanimation from '../assets/login_img.json'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage(''); // Clear error message on input change
  };

  // Handle form submission (login)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if any field is empty
    if (!formData.email || !formData.password) {
      setErrorMessage('All fields are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email.trim(),
        password: formData.password.trim(),
      });

      if (response.status === 200) {
        // If login is successful, you can store the JWT (if needed)
        // localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        // Display backend error message (e.g., incorrect password)
        setErrorMessage(error.response.data.message);
      } else {
        // Generic error message
        setErrorMessage('Something went wrong. Please try again later.');
      }
    }
  };

  // Handle forgot password click
  const handleForgotPassword = () => {
    if (!formData.email) {
      setErrorMessage('Please enter your email to reset your password.');
      return;
    }
    
    // Placeholder alert for password reset (replace with real API if implemented)
    alert(`A password reset link has been sent to ${formData.email}`);
  };

  return (
    <section className="flex min-h-screen bg-[#D6BFAA]">
      {/* Left Side Image */}
      <div className="hidden md:flex w-1/2 items-center justify-center">
      <Lottie animationData={loginanimation} loop={true}/>
      </div>


      {/* Right Side Card */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white rounded-xl shadow-lg p-8"
        >
          <h1 className="text-4xl font-extrabold mb-6 text-center tracking-wide text-[#2E2E2E]" style={{ fontFamily: '"Playfair Display", serif' }}>
            Welcome Back
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#14532D]">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 border border-[#14532D]/40 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14532D]"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#14532D]">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 border border-[#14532D]/40 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14532D]"
                placeholder="Enter your password"
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}

            {/* Forgot Password Link */}
            <div className="text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[#D97706] hover:underline text-sm"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#D97706] text-white py-2 rounded-md hover:bg-[#b45309] transition cursor-pointer"
            >
              Log In
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center text-sm text-[#2E2E2E] mt-4">
            Don't have an account?{' '}
            <a href="/register" className="text-[#D97706] hover:underline">
              Register
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Login;

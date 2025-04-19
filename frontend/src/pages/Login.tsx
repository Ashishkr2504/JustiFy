import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import framer-motion
import '@fontsource/playfair-display/400.css'
import '@fontsource/playfair-display/700.css'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const registeredUsers = [
    { email: 'user1@example.com', password: 'Password@123' },
    { email: 'user2@example.com', password: 'Password@456' },
  ]; // Simulated registered users

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = registeredUsers.find((u) => u.email === formData.email);

    if (!user) {
      setErrorMessage('User does not exist.');
      return;
    }

    if (user.password !== formData.password) {
      setErrorMessage('Incorrect password.');
      return;
    }

    navigate('/dashboard'); // Redirect to dashboard on successful login
  };

  const handleForgotPassword = () => {
    if (!formData.email) {
      setErrorMessage('Please enter your email to reset your password.');
      return;
    }

    // Simulate sending a reset link
    alert(`A password reset link has been sent to ${formData.email}`);
  };

  return (
    <section className="flex min-h-screen bg-[#D6BFAA]">
      {/* Left Side for Image */}
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <img
          src="/images/login-illustration.png"
          alt="Login Illustration"
          className="max-w-md w-full object-contain"
        />
      </div>

      {/* Right Side Card */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }} // Initial animation state
          animate={{ opacity: 1, y: 0 }} // Final animation state
          transition={{ duration: 0.6 }} // Duration of the animation
          className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 "
        >
              <h1 className="text-4xl font-extrabold mb-6  text-center tracking-wide text-[#2E2E2E]" style={{ fontFamily: '"Playfair Display", serif' }}>
          Welcome Back
        </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#14532D]">
                Email
              </label>
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
              <label className="block text-sm font-medium text-[#14532D]">
                Password
              </label>
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

            {/* Forgot Password */}
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
            <a
              href="/register"
              className="text-[#D97706] hover:underline"
            >
              Register
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Login;
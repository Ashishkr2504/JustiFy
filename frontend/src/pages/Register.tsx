import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 add this
import { motion } from 'framer-motion';
import axios from 'axios'; // Import axios for API calls
import '@fontsource/playfair-display/400.css'
import '@fontsource/playfair-display/700.css'

interface RegisterResponse {
  message: string; // Adjust this based on your backend response structure
}

const RegistrationPage = () => {
  const navigate = useNavigate(); // 👈 initialize navigate
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage('');
    setSuccessMessage('');
  };

  const validateForm = () => {
    const { firstName, lastName, email, password } = formData;
    if (!firstName || !lastName || !email || !password) {
      setErrorMessage('All fields are required.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.'
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // Define the expected response type
      interface RegisterResponse {
        message: string;
      }

      // Make API call to backend
     // Frontend
const response = await axios.post<RegisterResponse>('http://localhost:5000/api/auth/register', {
  firstName: formData.firstName,
  lastName: formData.lastName,
  email: formData.email,
  password: formData.password,
});


      // Handle successful registration
      setSuccessMessage(response.data.message); // TypeScript now knows 'message' exists
      setErrorMessage('');
      setTimeout(() => {
        navigate('/dashboard'); // Redirect to dashboard
      }, 1000);

      // Clear form data
      setFormData({ firstName: '', lastName: '', email: '', password: '' });
    } catch (error: any) {
      // Handle errors from the backend
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <section className="flex min-h-screen bg-[#FFFAF0]">
      {/* Left Side Illustration */}
      <div className="w-1/2 hidden md:flex items-center justify-center bg-[#FFFAF0]">
        <img
          src="/images/register-illustration.png"
          alt="Registration Illustration"
          className="max-w-md w-full object-contain"
        />
      </div>

      {/* Right Side Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 ">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white rounded-xl shadow-lg p-8"
        >
           <h1 className="text-4xl font-extrabold mb-6  text-center tracking-wide text-[#2E2E2E]" style={{ fontFamily: '"Playfair Display", serif' }}>
          Welcome 
        </h1>

          <form className="space-y-4" onSubmit={handleSubmit} >
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-[#14532D]">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 border border-[#14532D]/40 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14532D]"
                 placeholder="Enter your First Name"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-[#14532D]">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 border border-[#14532D]/40 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14532D]"
                placeholder="Enter your Last Name"
              />
            </div>

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

            {/* Success Message */}
            {successMessage && (
              <p className="text-green-500 text-sm text-center">
                {successMessage}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#D97706] text-white py-2 rounded-md hover:bg-[#b45309] transition  cursor-pointer"
            >
              Register
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-[#2E2E2E] mt-4">
            Already have an account?{' '}
            <a href="/login" className="text-[#D97706] hover:underline">
              Login
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

    // ⏩ Keep your existing JSX as-is
    // No changes needed in the JSX portion
  

export default RegistrationPage;

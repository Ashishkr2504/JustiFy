import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '@fontsource/playfair-display/400.css' // Regular weight
import '@fontsource/playfair-display/700.css' 

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password) {
      setErrorMessage('Password is required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/reset-password', {
        token,
        password,
      });

      if (response.status === 200) {
        setSuccessMessage('Password reset successful. Redirecting to login...');
        setTimeout(() => navigate('/login'), 3000);
      }
    } catch (error: any) {
      // console.log(error);
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#FFEDD5] via-[#FED7AA] to-[#FDBA74]">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1
          className="text-3xl font-extrabold mb-10 text-center tracking-wide text-[#2E2E2E]"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          Reset Password
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your new password"
            />
          </div>
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          {successMessage && (
            <p className="text-green-500 text-sm">{successMessage}</p>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-white font-semibold py-2 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
          >
            Reset Password
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
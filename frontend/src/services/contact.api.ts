import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE + '/contact'; // Replace with your contact API URL

// Send a contact form message
export const sendContactMessage = async (name: string, email: string, message: string) => {
  try {
    const response = await axios.post(API_URL, { name, email, message });
    return response.data;
  } catch (error) {
    throw error;
  }
};

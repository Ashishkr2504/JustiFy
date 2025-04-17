import axios from 'axios';

const API_URL = 'https://api.justify.com/contact'; // Replace with your contact API URL

// Send a contact form message
export const sendContactMessage = async (name: string, email: string, message: string) => {
  try {
    const response = await axios.post(API_URL, { name, email, message });
    return response.data;
  } catch (error) {
    throw error;
  }
};

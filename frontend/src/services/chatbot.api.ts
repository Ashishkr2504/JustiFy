import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE + '/chatbot'; // Backend API URL

// Get chatbot response API call
export const getChatbotResponse = async (query: string) => {
  try {
    const response = await axios.post(`${API_URL}/ask`, { query });
    return response.data;
  } catch (error) {
    throw error;
  }
};

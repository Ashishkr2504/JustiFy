import axios from 'axios';

const API_URL = 'https://api.justify.com/chatbot'; // Replace with your chatbot API URL

// Get chatbot response API call
export const getChatbotResponse = async (message: string) => {
  try {
    const response = await axios.post(API_URL, { message });
    return response.data;
  } catch (error) {
    throw error;
  }
};

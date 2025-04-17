import axios from 'axios';

const API_URL = 'https://api.justify.com/blog'; // Replace with your blog API URL

// Get all blog posts API call
export const getBlogPosts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get a single blog post by ID
export const getBlogPost = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

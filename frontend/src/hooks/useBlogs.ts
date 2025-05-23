import { useEffect, useState } from 'react';

const BLOG_API = import.meta.env.VITE_API_BASE + '/blogs/latest'; // Update this if deployed

export const useBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const cached = localStorage.getItem('blogs');
      const cachedTime = localStorage.getItem('blogsUpdatedAt');
      const now = Date.now();

      // If cache exists and is fresh (< 5 mins), use it
      if (cached && cachedTime && now - parseInt(cachedTime) < 5 * 60 * 1000) {
        setBlogs(JSON.parse(cached));
        setLoading(false);
        return;
      }

      const res = await fetch(BLOG_API);

      // Check if the response is OK
      if (!res.ok) {
        throw new Error(`Failed to fetch blogs: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      console.log('Fetched blogs:', data);

      // Ensure the response contains `articles`
      if (!data.articles) {
        throw new Error('Invalid response format: Missing "articles" field');
      }

      setBlogs(data.articles);
      localStorage.setItem('blogs', JSON.stringify(data.articles));
      localStorage.setItem('blogsUpdatedAt', now.toString());
    } catch (err) {
      if (err instanceof Error) {
        console.error('Failed to fetch blogs:', err.message);
      } else {
        console.error('Failed to fetch blogs:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(); // Initial fetch

    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchBlogs, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { blogs, loading };
};

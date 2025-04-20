// src/controllers/blog.controller.ts
import { Request, Response } from 'express';
import axios from 'axios';

export const getLatestBlogs = async (_req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=india+LAW+&language=en&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`
    );

    const articles = response.data.articles.slice(0, 10); // Take only 10 articles
    res.status(200).json({ articles });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: 'Failed to fetch blog data' });
  }
};

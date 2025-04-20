// src/controllers/blog.controller.ts
import { Request, Response } from 'express';
import axios from 'axios';

export const getLatestBlogs = async (_req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=India%20AND%20(law%20OR%20legal%20OR%20court%20OR%20judgment%20OR%20crime)&language=en&sortBy=publishedAt&domains=thehindu.com,indianexpress.com,livemint.com,hindustantimes.com,barandbench.com,indiatoday.in&apiKey=${process.env.NEWS_API_KEY}`
    );
    
    

    interface Article {
      title: string;
      description: string;
      urlToImage: string;
    }

    interface NewsApiResponse {
      articles: Article[];
    }

    const apiResponse: NewsApiResponse = response.data;

    const filteredArticles = response.data.articles.filter((article: Article) =>
      /(law|court|legal|verdict|judgment|crime)/i.test(article.title + article.description) &&
      /India|Indian/i.test(article.title + article.description)&&
      article.urlToImage
    );
    
    
     // Take only 10 articles

    res.status(200).json({ articles :filteredArticles});
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: 'Failed to fetch blog data' });
  }
};

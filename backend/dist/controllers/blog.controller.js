"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestBlogs = void 0;
const axios_1 = __importDefault(require("axios"));
const getLatestBlogs = async (_req, res) => {
    try {
        const response = await axios_1.default.get(`https://newsapi.org/v2/everything?q=India%20AND%20(law%20OR%20legal%20OR%20court%20OR%20judgment%20OR%20crime)&language=en&sortBy=publishedAt&domains=thehindu.com,indianexpress.com,livemint.com,hindustantimes.com,barandbench.com,indiatoday.in&apiKey=${process.env.NEWS_API_KEY}`);
        const filteredArticles = response.data.articles.filter((article) => /(law|court|legal|verdict|judgment|crime)/i.test(article.title + article.description) &&
            /India|Indian/i.test(article.title + article.description) &&
            article.urlToImage);
        // Take only 10 articles
        res.status(200).json({ articles: filteredArticles });
    }
    catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ message: 'Failed to fetch blog data' });
    }
};
exports.getLatestBlogs = getLatestBlogs;

import { Request, Response } from 'express';
import axios from 'axios';

const mlUrl = process.env.ML_SERVICE_URL || 'http://localhost:5001';

export const searchDocuments = async (req: Request, res: Response) => {
  console.log('Received /api/document/search request'); // Add this
  const { query, filter } = req.body;
  try {
    const pyRes = await axios.post(`${mlUrl}/search`, { query, filter });
    res.json(pyRes.data);
  } catch (err) {
    console.error('Error in searchDocuments:', err); // Add this
    res.status(500).json({ error: 'Search failed' });
  }
};
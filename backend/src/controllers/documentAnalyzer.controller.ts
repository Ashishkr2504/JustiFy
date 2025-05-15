// controllers/documentAnalyzer.controller.ts
import { Request, Response } from 'express';
import formidable from 'formidable';
import fs from 'fs';
import { extractTextFromPDF } from '../utils/extractText';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export const analyzeDocument = async (req: Request, res: Response) => {
  const form = formidable({ uploadDir: './uploads', keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err || !files.file) {
      return res.status(400).json({ error: 'File upload failed' });
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    const filePath = file.filepath;

    try {
      const extractedText = await extractTextFromPDF(filePath);

      // Compose prompt in a clear, legal-expert style
      const prompt = `
You are a legal expert. Analyze the following legal document text and extract:
1. Summary in 5 bullet points.
2. Key clauses with headings (e.g., Rent, Termination, Obligations).
3. Any missing or risky clauses.
4. Tone (e.g., neutral, tenant-friendly, etc.).

Document Text:
"""${extractedText}"""
      `.trim();

      const model = gemini.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

      // Use generateContent and get the text result
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const analysis = response.text();

      res.status(200).json({ analysis });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Analysis failed' });
    } finally {
      // Clean up uploaded file
      try { fs.unlinkSync(filePath); } catch {}
    }
  });
};

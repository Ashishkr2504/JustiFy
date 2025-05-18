import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

router.post("/", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "No text provided" });

  try {
    const prompt = `Translate the following text from Hindi to English only give the translation nothing else: \n\n"${text}"\n\nTranslation:`;
    const model = gemini.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const translation = response.text().trim();
    res.json({ translation });
  } catch (err) {
    res.status(500).json({ error: "Translation failed" });
  }
});

export default router;
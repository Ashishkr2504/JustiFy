"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeDocument = void 0;
const formidable_1 = __importDefault(require("formidable"));
const fs_1 = __importDefault(require("fs"));
const extractText_1 = require("../utils/extractText");
const dotenv_1 = __importDefault(require("dotenv"));
const generative_ai_1 = require("@google/generative-ai");
dotenv_1.default.config();
const gemini = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const analyzeDocument = async (req, res) => {
    const form = (0, formidable_1.default)({ uploadDir: './uploads', keepExtensions: true });
    form.parse(req, async (err, fields, files) => {
        if (err || !files.file) {
            return res.status(400).json({ error: 'File upload failed' });
        }
        const file = Array.isArray(files.file) ? files.file[0] : files.file;
        const filePath = file.filepath;
        try {
            const extractedText = await (0, extractText_1.extractTextFromPDF)(filePath);
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
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Analysis failed' });
        }
        finally {
            // Clean up uploaded file
            try {
                fs_1.default.unlinkSync(filePath);
            }
            catch { }
        }
    });
};
exports.analyzeDocument = analyzeDocument;

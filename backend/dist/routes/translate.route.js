"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const generative_ai_1 = require("@google/generative-ai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
const gemini = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
router.post("/", async (req, res) => {
    const { text } = req.body;
    if (!text)
        return res.status(400).json({ error: "No text provided" });
    try {
        const prompt = `Translate the following text from Hindi to English only give the translation nothing else: \n\n"${text}"\n\nTranslation:`;
        const model = gemini.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const translation = response.text().trim();
        res.json({ translation });
    }
    catch (err) {
        res.status(500).json({ error: "Translation failed" });
    }
});
exports.default = router;

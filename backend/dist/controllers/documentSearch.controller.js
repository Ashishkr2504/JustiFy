"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchDocuments = void 0;
const axios_1 = __importDefault(require("axios"));
const mlUrl = process.env.ML_SERVICE_URL || 'http://localhost:5001';
const searchDocuments = async (req, res) => {
    console.log('Received /api/document/search request'); // Add this
    const { query, filter } = req.body;
    try {
        const pyRes = await axios_1.default.post(`${mlUrl}/search`, { query, filter });
        res.json(pyRes.data);
    }
    catch (err) {
        console.error('Error in searchDocuments:', err); // Add this
        res.status(500).json({ error: 'Search failed' });
    }
};
exports.searchDocuments = searchDocuments;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askChatbot = void 0;
const chatbot_service_1 = require("../services/chatbot.service");
const askChatbot = async (req, res) => {
    var _a;
    try {
        const { query } = req.body;
        if (!query) {
            return res.status(400).json({ message: 'Query is required' });
        }
        const rawAnswer = await (0, chatbot_service_1.handleChatQuery)(query, ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || 'anonymous');
        // Output already contains line breaks and tabs — just return it as-is
        res.status(200).json({ answer: rawAnswer.trim() });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Chatbot error occurred' });
    }
};
exports.askChatbot = askChatbot;

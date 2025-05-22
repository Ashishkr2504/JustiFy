"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatbot_controller_1 = require("../controllers/chatbot.controller");
// import { protect } from '../middlewares/auth.middleware';
const router = (0, express_1.Router)();
// Protected route - only accessible after login
// @ts-ignore
router.post('/ask', chatbot_controller_1.askChatbot);
exports.default = router;

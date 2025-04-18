import { Router } from 'express';
import { askChatbot } from '../controllers/chatbot.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// Protected route - only accessible after login
// @ts-ignore
router.post('/ask', protect, askChatbot);

export default router;

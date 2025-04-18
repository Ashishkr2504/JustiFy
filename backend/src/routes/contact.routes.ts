import { Router } from 'express';
import { sendContactMessage } from '../controllers/contact.controller';

const router = Router();

// @ts-ignore
router.post('/send', sendContactMessage);

export default router;

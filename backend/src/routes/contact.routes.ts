import { Router } from 'express';
import { contactForm } from '../controllers/contact.controller';

const router = Router();

router.post('/', contactForm);

export default router;

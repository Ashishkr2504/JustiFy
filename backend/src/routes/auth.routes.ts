import { Router } from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/auth.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();
// @ts-ignore
router.post('/register', registerUser);
// @ts-ignore
router.post('/login', loginUser);
// @ts-ignore
router.get('/profile', protect, getUserProfile);

export default router;

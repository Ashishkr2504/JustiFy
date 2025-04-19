import { Router } from 'express';
import { registerUser, loginUser, getUserProfile, forgotPassword, resetPassword } from '../controllers/auth.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();
// @ts-ignore
router.post('/register', registerUser);
// @ts-ignore
router.post('/login', loginUser);
// @ts-ignore
router.get('/profile', protect, getUserProfile);
// @ts-ignore
router.post('/forgot-password', forgotPassword);
// @ts-ignore
router.post('/reset-password', resetPassword);

export default router;

// src/routes/blog.routes.ts
import { Router } from 'express';
import { getLatestBlogs } from '../controllers/blog.controller';

const router = Router();

router.get('/latest', getLatestBlogs);

export default router;

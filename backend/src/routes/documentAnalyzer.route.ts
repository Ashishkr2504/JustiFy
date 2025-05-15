// routes/documentAnalyzer.route.ts
import express from 'express';
import { analyzeDocument } from '../controllers/documentAnalyzer.controller';

const router = express.Router();

router.post('/analyze', analyzeDocument);

export default router;

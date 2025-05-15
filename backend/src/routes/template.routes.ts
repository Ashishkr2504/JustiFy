import express from 'express';
import { generateTemplate } from '../controllers/template.controller';

const router = express.Router();
// @ts-ignore
router.post('/generate', generateTemplate);

export default router;


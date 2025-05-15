import { Router } from 'express';
import { searchDocuments } from '../controllers/documentSearch.controller';

const router = Router();

router.post('/search', searchDocuments);

export default router;
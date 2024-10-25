import express from 'express';

import { getAllArticles } from '../controllers/article.js';

const router = express.Router();

router.get('/all', getAllArticles);

export default router;

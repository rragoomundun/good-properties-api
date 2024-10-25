import express from 'express';

import { getAllArticles, getArticle } from '../controllers/article.js';

const router = express.Router();

router.get('/all', getAllArticles).get('/:articleId', getArticle);

export default router;

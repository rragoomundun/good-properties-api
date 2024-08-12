import express from 'express';

import { getCurrentUser, getCurrentUserContact } from '../controllers/user.js';

import authorize from '../middlewares/authorize.js';

const router = express.Router();

router.get('/', authorize, getCurrentUser).get('/contact', authorize, getCurrentUserContact);

export default router;

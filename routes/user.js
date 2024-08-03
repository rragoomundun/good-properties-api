import express from 'express';

import { getCurrentUser } from '../controllers/user.js';

import authorize from '../middlewares/authorize.js';

const router = express.Router();

router.get('/', authorize, getCurrentUser);

export default router;

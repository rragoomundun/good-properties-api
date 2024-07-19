import express from 'express';

import { register } from '../controllers/auth.js';

import { registerValidator } from '../validators/auth.js';

const router = express.Router();

router.post('/register', registerValidator, register);

export default router;

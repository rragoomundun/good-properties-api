import express from 'express';

import { register, login } from '../controllers/auth.js';

import { loginValidator, registerValidator } from '../validators/auth.js';

const router = express.Router();

router.post('/register', registerValidator, register).post('/login', loginValidator, login);

export default router;

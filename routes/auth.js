import express from 'express';

import { register, registerConfirm, login } from '../controllers/auth.js';

import { loginValidator, registerValidator } from '../validators/auth.js';

const router = express.Router();

router
  .post('/register', registerValidator, register)
  .post('/register/confirm/:confirmationToken', registerConfirm)
  .post('/login', loginValidator, login);

export default router;

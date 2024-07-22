import express from 'express';

import { register, registerConfirm, login, forgotPassword } from '../controllers/auth.js';

import { loginValidator, registerValidator, forgotPasswordValidator } from '../validators/auth.js';

const router = express.Router();

router
  .post('/register', registerValidator, register)
  .post('/register/confirm/:confirmationToken', registerConfirm)
  .post('/login', loginValidator, login)
  .post('/password/forgot', forgotPasswordValidator, forgotPassword);

export default router;

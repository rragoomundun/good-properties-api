import express from 'express';

import { register, registerConfirm, login, forgotPassword, resetPassword } from '../controllers/auth.js';

import {
  loginValidator,
  registerValidator,
  forgotPasswordValidator,
  resetPasswordValidator
} from '../validators/auth.js';

const router = express.Router();

router
  .post('/register', registerValidator, register)
  .post('/register/confirm/:confirmationToken', registerConfirm)
  .post('/login', loginValidator, login)
  .post('/password/forgot', forgotPasswordValidator, forgotPassword)
  .post('/password/reset/:resetPasswordToken', resetPasswordValidator, resetPassword);

export default router;

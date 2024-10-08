import express from 'express';

import {
  register,
  registerConfirm,
  login,
  logout,
  forgotPassword,
  resetPassword,
  authorized
} from '../controllers/auth.js';

import authorize from '../middlewares/authorize.js';

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
  .get('/logout', logout)
  .post('/password/forgot', forgotPasswordValidator, forgotPassword)
  .post('/password/reset/:resetPasswordToken', resetPasswordValidator, resetPassword)
  .get('/authorized', authorize, authorized);

export default router;

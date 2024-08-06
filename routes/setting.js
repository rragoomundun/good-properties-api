import express from 'express';

import { updateEmail, updatePassword, updateContact } from '../controllers/setting.js';

import { updateEmailValidator, updatePasswordValidator } from '../validators/setting.js';

import authorize from '../middlewares/authorize.js';

const router = express.Router();

router
  .put('/email', authorize, updateEmailValidator, updateEmail)
  .put('/password', authorize, updatePasswordValidator, updatePassword)
  .put('/contact', authorize, updateContact);

export default router;

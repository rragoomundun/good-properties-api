import express from 'express';

import { updateEmail, updatePassword, updateContact, deleteAccount } from '../controllers/setting.js';

import { updateEmailValidator, updatePasswordValidator, updateContactValidator } from '../validators/setting.js';

import authorize from '../middlewares/authorize.js';

const router = express.Router();

router
  .put('/email', authorize, updateEmailValidator, updateEmail)
  .put('/password', authorize, updatePasswordValidator, updatePassword)
  .put('/contact', authorize, updateContactValidator, updateContact)
  .delete('/delete', authorize, deleteAccount);

export default router;

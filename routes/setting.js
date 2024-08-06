import express from 'express';

import { updateEmail } from '../controllers/setting.js';

import { updateEmailValidator } from '../validators/setting.js';

import authorize from '../middlewares/authorize.js';

const router = express.Router();

router.put('/email', authorize, updateEmailValidator, updateEmail);

export default router;

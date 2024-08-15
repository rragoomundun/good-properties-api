import express from 'express';

import { upload } from '../controllers/upload.js';

import authorize from '../middlewares/authorize.js';

const router = express.Router();

router.post('/', authorize, upload);

export default router;

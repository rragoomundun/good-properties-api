import express from 'express';

import { upload } from '../files/upload.js';

import { uploadFile } from '../controllers/file.js';

import { fileUploadValidator } from '../validators/file.js';

import authorize from '../middlewares/authorize.js';

const router = express.Router();

router.post('/', authorize, upload.single('file'), fileUploadValidator, uploadFile);

export default router;

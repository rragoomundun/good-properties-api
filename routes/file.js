import express from 'express';

import { upload } from '../files/upload.js';

import { uploadFile, deleteFile } from '../controllers/file.js';

import { fileDeleteValidator, fileUploadValidator } from '../validators/file.js';

import authorize from '../middlewares/authorize.js';

const router = express.Router();

router
  .post('/', authorize, upload.single('file'), fileUploadValidator, uploadFile)
  .delete('/', authorize, fileDeleteValidator, deleteFile);

export default router;

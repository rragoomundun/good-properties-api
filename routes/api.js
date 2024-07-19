import express from 'express';

import { getStatus } from '../controllers/api.js';

const router = express.Router();

router.get('/status', getStatus);

export default router;

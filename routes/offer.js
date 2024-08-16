import express from 'express';

import { getFeatures } from '../controllers/offer.js';

const router = express.Router();

router.get('/features', getFeatures);

export default router;

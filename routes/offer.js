import express from 'express';

import { createOffer, getFeatures } from '../controllers/offer.js';

import authorize from '../middlewares/authorize.js';

import { createOfferValidator } from '../validators/offer.js';

const router = express.Router();

router.get('/features', getFeatures).post('/', authorize, createOfferValidator, createOffer);

export default router;

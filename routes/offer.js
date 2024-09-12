import express from 'express';

import { createOffer, getFeatures, getOffer } from '../controllers/offer.js';

import authorize from '../middlewares/authorize.js';

import { createOfferValidator } from '../validators/offer.js';

const router = express.Router();

router.get('/features', getFeatures).get('/:offerId', getOffer).post('/', authorize, createOfferValidator, createOffer);

export default router;

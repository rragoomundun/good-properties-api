import express from 'express';

import { createOffer, getFeatures, getMyOffersMeta, getMyOffers, getOffer } from '../controllers/offer.js';

import authorize from '../middlewares/authorize.js';

import { createOfferValidator } from '../validators/offer.js';

const router = express.Router();

router
  .get('/features', getFeatures)
  .get('/my-offers/meta', authorize, getMyOffersMeta)
  .get('/my-offers', authorize, getMyOffers)
  .get('/:offerId', getOffer)
  .post('/', authorize, createOfferValidator, createOffer);

export default router;

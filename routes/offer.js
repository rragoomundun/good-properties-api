import express from 'express';

import {
  createOffer,
  getFeatures,
  getMyOffersMeta,
  getMyOffers,
  getOffer,
  searchOffers
} from '../controllers/offer.js';

import authorize from '../middlewares/authorize.js';

import { createOfferValidator, searchOfferValidator } from '../validators/offer.js';

const router = express.Router();

router
  .get('/features', getFeatures)
  .get('/my-offers/meta', authorize, getMyOffersMeta)
  .get('/my-offers', authorize, getMyOffers)
  .get('/search', searchOfferValidator, searchOffers)
  .get('/:offerId', getOffer)
  .post('/', authorize, createOfferValidator, createOffer);

export default router;

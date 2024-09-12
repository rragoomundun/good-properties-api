import httpStatus from 'http-status-codes';

import Offer from '../models/Offer.js';
import OfferImage from '../models/OfferImage.js';
import OfferFeature from '../models/OfferFeature.js';
import OfferOfferFeature from '../models/OfferOfferFeature.js';
import ErrorResponse from '../classes/ErrorResponse.js';
import Contact from '../models/Contact.js';

import dbUtil from '../utils/db.js';

/**
 * @api {GET} /offer/features Get Features
 * @apiGroup Offer
 * @apiName OfferFeatures
 *
 * @apiDescription Get all available features for an offer.
 *
 * @apiPermission Public
 */
const getFeatures = async (req, res, next) => {
  const features = await OfferFeature.findAll();
  const featuresGroupped = {
    general: [],
    indoor: [],
    outdoor: []
  };

  for (const feature of features) {
    featuresGroupped[feature.type].push({
      id: feature.id,
      name: feature.name
    });
  }

  res.status(httpStatus.OK).json(featuresGroupped);
};

/**
 * @api {GET} /offer/:offerId Get Offer
 * @apiGroup Offer
 * @apiName OfferGet
 *
 * @apiDescription Get an offer.
 *
 * @apiParam {Number} offerId The offer id
 *
 * @apiSuccessExample Success Example
 * {
 *   "id": 14,
 *   "type_of_good": "apartment",
 *   "transaction_type": "to-rent",
 *   "square_meters": 24,
 *   "nb_rooms": 2,
 *   "nb_bedrooms": 1,
 *   "price": 8000,
 *   "description": "Lorem ipsum...",
 *   "city_id": 67865,
 *   "images": [
 *     "img.r3tests.net/good-properties/29/1726064100370.jpeg",
 *     "img.r3tests.net/good-properties/29/1726064100449.jpeg"
 *   ],
 *   "features": {
 *     "general": [
 *       "Close to shops"
 *     ],
 *     "indoor": [
 *       "Air conditioning",
 *       "Internet/Wi-Fi"
 *     ],
 *     "outdoor": [
 *       "Garage"
 *     ]
 *   },
 *   "contact": {
 *     "email": "alicia.meller@example.com",
 *     "telephone": "",
 *     "whatsapp": ""
 *   }
 * }
 *
 * @apiPermission Public
 */
const getOffer = async (req, res, next) => {
  const { offerId } = req.params;
  let result;

  try {
    result = await dbUtil.transaction(async (transaction) => {
      const offer = await Offer.findOne({ where: { id: offerId } }, { transaction });
      const offerImages = await OfferImage.findAll({ where: { offer_id: offerId } }, { transaction });
      const offerFeaturesIds = (
        await OfferOfferFeature.findAll({ where: { offer_id: offerId }, raw: true }, { transaction })
      ).map((offerFeatureId) => offerFeatureId.offer_feature_id);
      const offerFeatures = await OfferFeature.findAll({ where: { id: offerFeaturesIds } });
      const contact = await Contact.findOne({ where: { user_id: offer.user_id } });

      return { offer, offerImages, offerFeatures, contact };
    });
  } catch {
    return next(new ErrorResponse('Cannot find offer', httpStatus.NOT_FOUND, 'NOT_FOUND'));
  }

  const offer = {
    id: result.offer.id,
    type_of_good: result.offer.type_of_good,
    transaction_type: result.offer.transaction_type,
    square_meters: result.offer.square_meters,
    nb_rooms: result.offer.nb_rooms,
    nb_bedrooms: result.offer.nb_bedrooms,
    price: result.offer.price,
    description: result.offer.description,
    city_id: result.offer.city_id,
    images: result.offerImages.map((image) => image.link),
    features: {
      general: [],
      indoor: [],
      outdoor: []
    },
    contact: {
      email: result.contact.email,
      telephone: result.contact.telephone,
      whatsapp: result.contact.whatsapp
    }
  };

  for (const feature of result.offerFeatures) {
    if (feature.type === 'general') {
      offer.features.general.push(feature.name);
    } else if (feature.type === 'indoor') {
      offer.features.indoor.push(feature.name);
    } else {
      offer.features.outdoor.push(feature.name);
    }
  }

  res.status(httpStatus.OK).json(offer);
};

/**
 * @api {POST} /offer Create Offer
 * @apiGroup Offer
 * @apiName OfferCreate
 *
 * @apiDescription Create a new offer.
 *
 * @apiBody {String[]} images The offer images
 * @apiBody {String="house","apartment","room"} type_of_good The type of good
 * @apiBody {String="to-sell","to-rent"} transaction_type The type of transaction
 * @æpiBody {Number} square_meters The number of square meters
 * @apiBody {Number} nb_rooms The number of rooms
 * @apiBody {Number} nb_bedrooms The number of bedrooms
 * @apiBody {Number} price The price
 * @apiBody {String} description The description
 * @apiBody {Number} city_id The city id
 * @apiBody {Number[]} features The features of the offer
 *
 * @apiParamExample {json} Body Example
 * {
 *   "images": ["room1.jpg"],
 *   "type_of_good": "room",
 *   "transaction_type": "to-rent",
 *   "square_meters":  "80",
 *   "nb_rooms": 4,
 *   "nb_bedrooms": 2,
 *   "price": 20000,
 *   "description": "Lorem ipsum...",
 *   "city_id": 67865,
 *   "features": [2, 4, 9]
 * }
 *
 * @apiSuccess (Success (200)) {Number} id The created offer id
 * @apiSuccessExample Success Example
 * {
 *   "id": 21
 * }
 *
 * @apiError (Error (400)) NO_CONTACT The user has no contact information
 * @apiError (Error (400)) INVALID_PARAMETERS One or more parameters are invalid
 * @apiError (Error (500)) CREATION_FAILED Cannot create offer
 *
 * @apiPermission Private
 */
const createOffer = async (req, res, next) => {
  const contact = await Contact.findOne({ where: { user_id: req.user.id } });

  if (!contact || (!contact.email && !contact.telephone && !contact.whatsapp)) {
    return next(new ErrorResponse('The user has no contact information', httpStatus.BAD_REQUEST, 'NO_CONTACT'));
  }

  const {
    images,
    type_of_good,
    transaction_type,
    square_meters,
    nb_rooms,
    nb_bedrooms,
    price,
    description,
    city_id,
    features
  } = req.body;

  let result;

  try {
    result = await dbUtil.transaction(async (transaction) => {
      const offer = await Offer.create(
        {
          type_of_good,
          transaction_type,
          square_meters,
          nb_rooms,
          nb_bedrooms,
          price,
          description,
          city_id,
          user_id: req.user.id
        },
        { transaction }
      );

      const imagesData = images.map((image) => ({ link: image, offer_id: offer.id }));
      await OfferImage.bulkCreate(imagesData, { transaction });

      const offerOfferFeatureData = features.map((feature) => ({ offer_id: offer.id, offer_feature_id: feature }));
      await OfferOfferFeature.bulkCreate(offerOfferFeatureData, { transaction });

      return { offer };
    });
  } catch {
    return next(new ErrorResponse('Cannot create offer', httpStatus.INTERNAL_SERVER_ERROR, 'CREATION_FAILED'));
  }

  res.status(httpStatus.OK).json({ id: result.offer.id });
};

export { getFeatures, getOffer, createOffer };

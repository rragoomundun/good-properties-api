import httpStatus from 'http-status-codes';

import OfferFeature from '../models/OfferFeature.js';

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

export { getFeatures };

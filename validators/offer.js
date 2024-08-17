import { body } from 'express-validator';

import validation from './validation.js';

const createOfferValidator = validation([
  body('images').custom((value) => {
    if (Array.isArray(value) === false || value.length === 0) {
      throw new Error('message=Please add at least one image;type=NO_IMAGES');
    }
  }),
  body('type_of_good')
    .notEmpty()
    .withMessage('message=Please add the type of good;type=NO_TYPE_OF_GOOD')
    .custom((value) => {
      if (['house', 'apartment', 'room'].includes(value) === false) {
        throw new Error('message=The type of good is invalid;type=INVALID_TYPE_OF_GOOD');
      }
    }),
  body('transaction_type')
    .notEmpty()
    .withMessage('message=Please add the transaction type;type=NO_TRANSACTION_TYPE')
    .custom((value) => {
      if (['to-sell', 'to-rent'].includes(value) === false) {
        throw new Error('message=The transaction type is invalid;type=INVALID_TRANSACTION_TYPE');
      }
    }),
  body('square_meters').notEmpty().withMessage('message=Please add the number of square meters;type=NO_SQUARE_METERS'),
  body('nb_rooms').notEmpty().withMessage('message=Please add the number of rooms;type=NO_NB_ROOMS'),
  body('nb_bedrooms').notEmpty().withMessage('message=Please add the number of bedrooms;type=NO_NB_BEDROOMS'),
  body('price').notEmpty().withMessage('message=Please add the price;type=NO_PRICE'),
  body('city_id')
    .notEmpty()
    .withMessage('message=Please add the city id;type=NO_CITY_ID')
    .isNumeric()
    .withMessage('message=The city id must be numeric;type=CITY_ID_NOT_NUMERIC'),
  body('features').custom((value) => {
    if (Array.isArray(value) === false || value.every((v) => typeof v === 'number') === false) {
      throw new Error('message=features must be an array of number;type=FEATURES_NOT_ARRAY_OF_NUMBER');
    }
  })
]);

export { createOfferValidator };

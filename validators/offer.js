import { body, query } from 'express-validator';

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

const searchOfferValidator = validation([
  query('type_of_good')
    .notEmpty()
    .withMessage('message=Please add the type of good;type=NO_TYPE_OF_GOOD')
    .custom((value) => {
      if (['house', 'apartment', 'room'].includes(value) === false) {
        throw new Error('message=The type of good is invalid;type=INVALID_TYPE_OF_GOOD');
      }
    }),
  query('transaction_type')
    .notEmpty()
    .withMessage('message=Please add the transaction_type;type=NO_TRANSACTION_TYPE')
    .custom((value) => {
      if (['to-sell', 'to-rent'].includes(value) === false) {
        throw new Error('message=The transaction type is invalid;type=INVALID_TRANSACTION_TYPE');
      }
    }),
  query('city_ids').notEmpty().withMessage('message=Please add one or more city ids;type=NO_CITY_IDS'),
  query('min_price')
    .optional()
    .isInt({ min: 1 })
    .withMessage('message=min_price must be a number greater than 0;type=MIN_PRICE_NAN_OR_LESSER_THAN_1'),
  query('max_price')
    .optional()
    .isInt({ min: 1 })
    .withMessage('message=max_price must be a number greater than 0;type=MAX_PRICE_NAN_OR_LESSER_THAN_1')
    .custom((value, { req }) => {
      const { min_price } = req.query;

      if (min_price && value <= min_price) {
        throw new Error('message=max_price must be greater than min_price;type=MAX_PRICE_LESSER_OR_EQUALS_MIN_PRICE');
      }
    }),
  query('min_square_meters')
    .optional()
    .isInt({ min: 1 })
    .withMessage(
      'message=min_square_meters must be a number greater than 0;type=MIN_SQUARE_METERS_NAN_OR_LESSER_THAN_1'
    ),
  query('max_square_meters')
    .optional()
    .isInt({ min: 1 })
    .withMessage('message=max_square_meters must be a number geater than 0;type=MAX_SQUARE_METERS_NAN_OR_LESSER_THAN_1')
    .custom((value, { req }) => {
      const { min_square_meters } = req.query;

      if (min_square_meters && value <= min_square_meters) {
        throw new Error(
          'message=max_square_meters must be greater than min_square_meters;type=MAX_SQUARE_METERS_LESSER_OR_EQUALS_MIN_SQUARE_METERS'
        );
      }
    }),
  query('nb_rooms')
    .optional()
    .isInt({ min: 1 })
    .withMessage('message=nb_rooms must be a number greater or equals to 1;type=NB_ROOMS_NAN_OR_LESSER_THAN_1'),
  query('nb_bedrooms')
    .optional()
    .isInt({ min: 1 })
    .withMessage('message=nb_bedrooms must be a number geater or equals to 1;type=NB_BEDROOMS_NAN_OR_LESSER_THAN_1')
    .custom((value, { req }) => {
      const { nb_rooms } = req.query;

      if (nb_rooms && value > nb_rooms) {
        throw new Error(
          'message=nb_bedrooms must be lesser or equals to nb_rooms;type=NB_BEDROOMS_GREATER_THEN_NB_ROOMS'
        );
      }
    })
]);

export { createOfferValidator, searchOfferValidator };

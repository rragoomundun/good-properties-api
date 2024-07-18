import { DataTypes } from 'sequelize';

import Offer from './Offer.js';
import OfferFeature from './OfferFeature.js';

import dbUtil from '../utils/db.js';

const OfferOfferFeature = dbUtil.define(
  'OfferOfferFeature',
  {
    offer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Offer,
        key: 'id'
      }
    },
    offer_feature_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: OfferFeature,
        key: 'id'
      }
    }
  },
  { timestamps: false, tableName: 'offer_offer_features' }
);

export default OfferOfferFeature;

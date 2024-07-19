import { DataTypes } from 'sequelize';

import dbUtil from '../utils/db.js';

const OfferFeature = dbUtil.define(
  'OfferFeature',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('general', 'indoor', 'outdoor'),
      allowNull: false
    }
  },
  {
    timestamps: false,
    tableName: 'offer_features'
  }
);

export default OfferFeature;

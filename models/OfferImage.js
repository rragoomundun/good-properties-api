import { DataTypes } from 'sequelize';

import dbUtil from '../utils/db.js';

const OfferImage = dbUtil.define(
  'OfferImage',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  { timestamps: false, tableName: 'offer_images' }
);

export default OfferImage;

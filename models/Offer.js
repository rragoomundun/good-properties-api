import { DataTypes } from 'sequelize';

import dbUtil from '../utils/db.js';

const Offer = dbUtil.define(
  'Offer',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type_of_good: {
      type: DataTypes.ENUM('house', 'apartment', 'room'),
      allowNull: false
    },
    transaction_type: {
      type: DataTypes.ENUM('to-sell', 'to-rent'),
      allowNull: false
    },
    square_meters: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nb_rooms: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nb_bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  { timestamps: false, tableName: 'offers' }
);

export default Offer;

import { DataTypes } from 'sequelize';

import dbUtil from '../utils/db.js';

const Contact = dbUtil.define(
  'Contact',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING
    },
    telephone: {
      type: DataTypes.STRING
    },
    whatsapp: {
      type: DataTypes.STRING
    }
  },
  { timestamps: false, tableName: 'contacts' }
);

export default Contact;

// Setup the database

import colors from 'colors';

import User from './models/User.js';
import Token from './models/Token.js';
import Contact from './models/Contact.js';
import Offer from './models/Offer.js';
import OfferFeature from './models/OfferFeature.js';
import OfferImage from './models/OfferImage.js';
import OfferOfferFeature from './models/OfferOfferFeature.js';

import associate from './models/associate.js';

import dbUtil from './utils/db.js';

associate();

try {
  await dbUtil.sync({ force: true });
  console.log('[OK] Database and tables created'.green);
} catch {
  console.log('[FAILED] Cannot create database and tables'.red);
} finally {
  await dbUtil.close();
}

// Make database associations

import User from './User.js';
import Token from './Token.js';
import Contact from './Contact.js';
import Offer from './Offer.js';
import OfferImage from './OfferImage.js';
import OfferFeature from './OfferFeature.js';
import OfferOfferFeature from './OfferOfferFeature.js';

const associate = () => {
  User.hasMany(Token, {
    foreignKey: {
      name: 'user_id',
      allowNull: false
    }
  });
  Token.belongsTo(User, {
    foreignKey: {
      name: 'user_id',
      allowNull: false
    }
  });

  User.hasOne(Contact, {
    foreignKey: {
      name: 'user_id',
      allowNull: false
    }
  });
  Contact.belongsTo(User, {
    foreignKey: {
      name: 'user_id',
      allowNull: false
    }
  });

  User.hasMany(Offer, {
    foreignKey: {
      name: 'user_id',
      allowNull: false
    }
  });
  Offer.belongsTo(User, {
    foreignKey: {
      name: 'user_id',
      allowNull: false
    }
  });

  Offer.hasMany(OfferImage, {
    foreignKey: {
      name: 'offer_id',
      allowNull: false
    }
  });
  OfferImage.belongsTo(Offer, {
    foreignKey: {
      name: 'offer_id',
      allowNull: false
    }
  });

  Offer.belongsToMany(OfferFeature, {
    through: OfferOfferFeature,
    foreignKey: 'offer_id',
    otherKey: 'offer_feature_id'
  });
  OfferFeature.belongsToMany(Offer, {
    through: OfferOfferFeature,
    foreignKey: 'offer_feature_id',
    otherKey: 'offer_id'
  });
};

export default associate;

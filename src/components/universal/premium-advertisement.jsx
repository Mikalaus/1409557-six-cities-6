import React from 'react';
import PropTypes from 'prop-types';

const PremiumAdvertisement = ({isOfferPage = false}) => (
  <div className={isOfferPage ? `property__mark` : `place-card__mark`}>
    <span>Premium</span>
  </div>
);

PremiumAdvertisement.propTypes = {
  isOfferPage: PropTypes.bool
};

export default PremiumAdvertisement;

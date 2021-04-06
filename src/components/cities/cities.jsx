import React, {memo} from 'react';
import MainNoOffers from '../main-no-offers/main--no-offers';
import {getPinsForCurrentCity} from '../../utils';
import SortingOptionsForm from '../sorting-options-form/sorting-options-form';
import PlaceCardList from '../place-card-list/place-card-list';
import Map from '../map/map';
import PropTypes from 'prop-types';

const Cities = ({sortedOffers, cityName, cityLocation}) => {
  if (sortedOffers.length === 0) {
    return (
      <MainNoOffers />
    );
  }

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{sortedOffers.length} places to stay in {cityName}</b>
        <SortingOptionsForm />
        <div className="cities__places-list places__list tabs__content">
          {
            <PlaceCardList
              placesList={sortedOffers}
            />
          }
        </div>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map
            city={cityLocation}
            points={getPinsForCurrentCity(cityName, sortedOffers)}
          />
        </section>
      </div>
    </div>
  );
};

Cities.propTypes = {
  sortedOffers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        isFavorite: PropTypes.bool.isRequired,
        isPremium: PropTypes.bool.isRequired,
        previewImage: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
      })
  ),
  cityLocation: PropTypes.shape(
      {
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired
      }
  ),
  cityName: PropTypes.string.isRequired
};

export default memo(Cities);

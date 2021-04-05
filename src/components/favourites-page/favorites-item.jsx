import React from 'react';
import PlaceCard from '../universal/place-card';
import PropTypes from 'prop-types';

const FavoritesItem = ({city, offers}) => {

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {
          offers.map((place) => {
            return (
              <PlaceCard
                place={place}
                key={place.id}
              />
            );
          })
        }
      </div>
    </li>
  );
};

FavoritesItem.propTypes = {
  city: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(
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
};

export default FavoritesItem;

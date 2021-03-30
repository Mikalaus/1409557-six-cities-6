import React from 'react';
import PlaceCard from '../universal/place-card';
import PropTypes from 'prop-types';

const FavouritesPage = ({placesList}) => {

  const favouriteList = [];

  placesList.forEach((place) => {
    if (place.isFavorite) {
      favouriteList.push(place);
    }
  });

  return (
    <>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {
                    favouriteList.map((place) => {
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
            </ul>
          </section>
        </div>
      </main>
    </>
  );
};

FavouritesPage.propTypes = {
  placesList: PropTypes.arrayOf(
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
  )
};

export default FavouritesPage;

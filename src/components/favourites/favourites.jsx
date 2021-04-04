import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {getFavorites} from '../../store/api-actions';
import {connect} from 'react-redux';
import Spinner from '../spinner/spinner';
import Header from '../header/header';
import FavoritesItem from './favorites-item';

const FavouritesPage = ({isFavoritesLoaded, authorizationStatus, favorites, getFavoritesList}) => {

  const CITIES = [];

  let citiesOffers = new Map([
    [`Paris`, []],
    [`Cologne`, []],
    [`Brussels`, []],
    [`Amsterdam`, []],
    [`Hamburg`, []],
    [`Dusseldorf`, []],
  ]
  );

  const createFavoritesInfo = () => {
    favorites.forEach((offer) => {
      if (citiesOffers.has(offer.city.name)) {
        citiesOffers.get(offer.city.name).push(offer);
      }
    });

    for (let city of citiesOffers.keys()) {
      CITIES.push(city);
    }
  };

  useEffect(() => {
    if (!isFavoritesLoaded) {
      getFavoritesList();
    }
  }, [isFavoritesLoaded]);

  if (!isFavoritesLoaded) {
    return (
      <Spinner/>
    );
  }

  createFavoritesInfo();

  return (
    <>
      <Header authorizationStatus={authorizationStatus} />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {
                CITIES.map((key) => {
                  if (citiesOffers.get(key).length !== 0) {
                    return (<FavoritesItem key = {key} city = {key} offers = {citiesOffers.get(key)} />);
                  }

                  return (``);
                })
              }
            </ul>
          </section>
        </div>
      </main>
    </>
  );
};

FavouritesPage.propTypes = {
  favorites: PropTypes.arrayOf(
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
  isFavoritesLoaded: PropTypes.bool,
  authorizationStatus: PropTypes.bool,
  getFavoritesList: PropTypes.func
};

const mapDispatchToProps = {
  getFavoritesList: getFavorites
};

const mapStateToProps = (state) => {
  return {
    isFavoritesLoaded: state.isFavoritesLoaded,
    favorites: state.favorites,
    authorizationStatus: state.authorizationStatus
  };
};

export {FavouritesPage};
export default connect(mapStateToProps, mapDispatchToProps)(FavouritesPage);

import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {getFavorites, getUserInfo} from '../../store/api-actions';
import {connect} from 'react-redux';
import Spinner from '../spinner/spinner';
import Header from '../header/header';
import FavoritesItem from './favorites-item';

const FavouritesPage = ({
  isFavoritesLoaded,
  authorizationStatus,
  favorites,
  getFavoritesList,
  onUserInfo
}) => {

  useEffect(() => {
    onUserInfo();
  }, [authorizationStatus]);

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

  const renderFavouritesItems = (key) => {
    if (citiesOffers.get(key).length !== 0) {
      return (<FavoritesItem key = {key} city = {key} offers = {citiesOffers.get(key)} />);
    }

    return (``);
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
                CITIES.map(renderFavouritesItems)
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
  getFavoritesList: PropTypes.func,
  onUserInfo: PropTypes.func
};

const mapDispatchToProps = {
  getFavoritesList: getFavorites,
  onUserInfo: getUserInfo
};

const mapStateToProps = ({FAVORITES, USER}) => {
  return {
    isFavoritesLoaded: FAVORITES.isFavoritesLoaded,
    favorites: FAVORITES.favorites,
    authorizationStatus: USER.authorizationStatus
  };
};

export {FavouritesPage};
export default connect(mapStateToProps, mapDispatchToProps)(FavouritesPage);

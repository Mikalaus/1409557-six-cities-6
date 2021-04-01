import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import PlaceCardList from './place-card-list';
import Map from '../map/map';
import {getPinsForCurrentCity} from '../../utils';
import CityList from './city-list';
import {connect} from 'react-redux';
import MainNoOffers from './main--no-offers';
import SortingOptionsForm from './sorting-options-form';
import {checkAuth, fetchOffersList} from '../../store/api-actions';
import Spinner from '../spinner/spinner';

const MainPage = ({authorizationStatus, sortedOffers, cityLocation, cityName, isOffersLoaded, setOffers, checkAuthorization}) => {

  checkAuthorization();

  useEffect(() => {
    if (!isOffersLoaded) {
      setOffers();
    }
  }, [isOffersLoaded]);

  if (!isOffersLoaded) {
    return (
      <Spinner/>
    );
  }

  const checkIsUserAuthorized = () => {
    if (authorizationStatus) {
      return (
        <>
          <div className="header__avatar-wrapper user__avatar-wrapper"></div>
          <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
        </>
      );
    }

    return (
      <Link to="/login" className="header__nav-link header__nav-link--profile" href="#">
        Sign in
      </Link>
    );
  };

  const checkOffersAmount = () => {
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

  return (
    <>
      <div style={{display: `none`}}>
        <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol></svg>
      </div>

      <div className="page page--gray page--main">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link to="/" className="header__logo-link header__logo-link--active">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
                </Link>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    {checkIsUserAuthorized()}
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <CityList />
            </section>
          </div>
          <div className="cities">
            {checkOffersAmount()}
          </div>
        </main>
      </div>
    </>
  );
};

MainPage.propTypes = {
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
  cityName: PropTypes.string.isRequired,
  isOffersLoaded: PropTypes.bool.isRequired,
  setOffers: PropTypes.func.isRequired,
  checkAuthorization: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    sortedOffers: state.sortedOffers,
    cityLocation: state.cityLocation,
    cityName: state.cityName,
    isOffersLoaded: state.isOffersLoaded,
    authorizationStatus: state.authorizationStatus
  };
};

const mapDispatchToProps = (dispatch) => ({
  setOffers() {
    dispatch(fetchOffersList());
  },

  checkAuthorization() {
    dispatch(checkAuth());
  }
});

export {MainPage};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

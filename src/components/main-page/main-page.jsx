import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Cities from '../cities/cities';
import CityList from '../city-list/city-list';
import {connect} from 'react-redux';
import {fetchOffersList, getUserInfo} from '../../store/api-actions';
import Spinner from '../spinner/spinner';
import Header from '../header/header';
import {
  getSortedOffers,
  getCityName,
  getCityLocation,
  getIsOffersLoaded
} from '../../store/main-page-data/selectors';
import {getAuthorizationStatus} from '../../store/user-info-data/selectors';
import {setActiveOfferId} from '../../store/actions';

const MainPage = ({
  authorizationStatus,
  sortedOffers,
  cityLocation,
  cityName,
  isOffersLoaded,
  setOffers,
  onUserInfo,
  onActiveOfferId
}) => {

  onActiveOfferId(null);

  useEffect(() => {
    if (!isOffersLoaded) {
      setOffers();
    }
  }, [isOffersLoaded]);

  useEffect(() => {
    onUserInfo();
  }, [authorizationStatus]);

  if (!isOffersLoaded) {
    return (
      <Spinner/>
    );
  }

  return (
    <>
      <div style={{display: `none`}}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="icon-arrow-select" viewBox="0 0 7 4">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z">
            </path>
          </symbol>
          <symbol id="icon-bookmark" viewBox="0 0 17 18">
            <path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z">
            </path>
          </symbol>
          <symbol id="icon-star" viewBox="0 0 13 12">
            <path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z">
            </path>
          </symbol>
        </svg>
      </div>

      <div className="page page--gray page--main">

        <Header authorizationStatus = {authorizationStatus} />

        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <CityList />
            </section>
          </div>
          <div className="cities">
            <Cities
              sortedOffers = {sortedOffers}
              cityLocation = {cityLocation}
              cityName = {cityName}
            />
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
  authorizationStatus: PropTypes.bool,
  onUserInfo: PropTypes.func.isRequired,
  onActiveOfferId: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    sortedOffers: getSortedOffers(state),
    cityLocation: getCityLocation(state),
    cityName: getCityName(state),
    isOffersLoaded: getIsOffersLoaded(state),
    authorizationStatus: getAuthorizationStatus(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  setOffers() {
    dispatch(fetchOffersList());
  },

  onUserInfo() {
    dispatch(getUserInfo());
  },

  onActiveOfferId(id) {
    dispatch(setActiveOfferId(id));
  },
});

export {MainPage};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

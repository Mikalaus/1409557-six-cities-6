import React, {useEffect} from 'react';
import PhotoGallery from '../photo-gallery/photo-galery';
import CommentForm from '../comment-form/comment-form';
import PropTypes from 'prop-types';
import ReviewList from '../review-list/review-list';
import PlaceCard from '../universal/place-card';
import {useParams} from 'react-router-dom';
import Map from '../map/map';
import {countRating} from '../../utils';
import {fetchOffer, postFavorites} from '../../store/api-actions';
import {connect} from 'react-redux';
import Spinner from '../spinner/spinner';
import PremiumAdvertisement from '../universal/premium-advertisement';
import {nullifyIsOfferLoaded, setActivePointAction} from '../../store/actions';
import PropertiesList from '../property-list/property-list';
import Header from '../header/header';
import {getCityName, getCityLocation} from '../../store/main-page-data/selectors';
import {getFavoritesSelector} from '../../store/favorites-data/selectors';
import {getAuthorizationStatus} from '../../store/user-info-data/selectors';
import browserHistory from '../../browser-history';
import {
  getIsOfferLoaded,
  getNearby,
  getReviews,
  getActiveOfferId,
  getActiveOffer
} from '../../store/room-info-page-data/selectors';

const RoomInfoPage = ({
  offer,
  isOfferLoaded,
  setActiveOffer,
  cityLocation,
  isAuthorized,
  nearby,
  reviews,
  setActivePoint,
  nullifyOfferLoaded,
  addToFavorites
}) => {

  const onButtonClickCallback = () => {
    if (isAuthorized) {
      addToFavorites(id, !offer.isFavorite);
      offer.isFavorite = !offer.isFavorite;
    } else {
      browserHistory.push(`/login`);
    }
  };

  const {id} = useParams();

  useEffect(() => {
    setActiveOffer(Number(id));
  }, [id]);

  if (!isOfferLoaded) {
    return (
      <Spinner/>
    );
  }

  window.addEventListener(`popstate`, () => {
    nullifyOfferLoaded();
  });

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

      <Header authorizationStatus = {isAuthorized} />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <PhotoGallery images={offer.images.slice(-6)} />
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {offer.isPremium ? <PremiumAdvertisement isOfferPage={true}/> : offer.isPremium}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offer.title}
                </h1>
                <button
                  className={
                    `${offer.isFavorite ? `property__bookmark-button--active` : offer.isFavorite} property__bookmark-button button`}
                  type="button"
                  onClick = {onButtonClickCallback}
                >
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{offer.isFavorite ? `To bookmarks` : `In bookmarks`}</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${countRating(offer.rating)}`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {offer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <PropertiesList goods = {offer.goods}/>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div
                    className={`property__avatar-wrapper ${
                      offer.host.isPro ? `property__avatar-wrapper--pro` : offer.host.isPro
                    } user__avatar-wrapper`}>
                    <img
                      className="property__avatar user__avatar"
                      src={offer.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">
                    {offer.host.name}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <ReviewList reviewList={reviews} />
                {isAuthorized ? <CommentForm id = {Number(id)} /> : isAuthorized}
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map
              city={cityLocation}
              cards={[...nearby, offer]}
            />
            {setActivePoint(offer.location)}
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {
                nearby.map((place) => {
                  return (
                    <PlaceCard
                      place={place}
                      key={place.id}
                      isNearby = {true}
                    />
                  );
                })
              }
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

RoomInfoPage.propTypes = {
  offer: PropTypes.shape({
    isFavorite: PropTypes.bool,
    isPremium: PropTypes.bool,
    previewImage: PropTypes.string,
    price: PropTypes.number,
    rating: PropTypes.number,
    title: PropTypes.string,
    type: PropTypes.string,
    images: PropTypes.array,
    bedrooms: PropTypes.number,
    maxAdults: PropTypes.number,
    goods: PropTypes.array,
    host: PropTypes.shape({
      isPro: PropTypes.bool,
      avatarUrl: PropTypes.string,
      name: PropTypes.string
    }),
    description: PropTypes.string,
    location: PropTypes.object
  }),
  id: PropTypes.number,
  isOfferLoaded: PropTypes.bool,
  setActiveOffer: PropTypes.func,
  cityName: PropTypes.string,
  cityLocation: PropTypes.object,
  isAuthorized: PropTypes.bool,
  nearby: PropTypes.array,
  reviews: PropTypes.array,
  setActivePoint: PropTypes.func,
  nullifyOfferLoaded: PropTypes.func,
  favorites: PropTypes.array,
  addToFavorites: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    offer: getActiveOffer(state),
    isOfferLoaded: getIsOfferLoaded(state),
    cityName: getCityName(state),
    cityLocation: getCityLocation(state),
    isAuthorized: getAuthorizationStatus(state),
    nearby: getNearby(state),
    reviews: getReviews(state),
    id: getActiveOfferId(state),
    favorites: getFavoritesSelector(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  setActiveOffer(id) {
    dispatch(fetchOffer(id));
  },

  setActivePoint(point) {
    dispatch(setActivePointAction(point));
  },

  nullifyOfferLoaded() {
    dispatch(nullifyIsOfferLoaded());
  },
  addToFavorites(id, status) {
    dispatch(postFavorites(id, status));
  }
});

export {RoomInfoPage};
export default connect(mapStateToProps, mapDispatchToProps)(RoomInfoPage);

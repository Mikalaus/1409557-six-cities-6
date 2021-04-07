import {countRating} from '../../utils';
import PremiumAdvertisement from './premium-advertisement';
import React, {memo, createRef} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {postFavorites} from '../../store/api-actions';
import {setActiveOfferId, nullifyIsOfferLoaded} from '../../store/actions';
import {getAuthorizationStatus} from '../../store/user-info-data/selectors';
import browserHistory from '../../browser-history';

const PlaceCard = ({
  place,
  onActiveOfferId,
  nullifyOfferLoaded,
  isNearby = false,
  authorizationStatus,
  addToFavorites
}) => {

  onActiveOfferId(null);

  const bookmarkRef = createRef();

  const {
    title,
    previewImage,
    price,
    rating,
    type,
    isPremium,
    id
  } = place;

  const onMouseEnterCallback = () => {
    if (!isNearby) {
      onActiveOfferId(id);
    }
  };

  const onMouseOverCallback = () => {
    if (!isNearby) {
      onActiveOfferId(null);
    }
  };

  const onButtonClickCallback = () => {
    if (authorizationStatus) {
      addToFavorites(id, !place.isFavorite);
      place.isFavorite = !place.isFavorite;
      bookmarkRef.current.classList.toggle(`place-card__bookmark-button--active`);
    } else {
      browserHistory.push(`/login`);
    }
  };

  const linkClickHandler = () => {
    nullifyOfferLoaded();
    onActiveOfferId(id);
  };

  return (
    <article className={`cities__place-card place-card`}
      onMouseEnter={onMouseEnterCallback}
      onMouseLeave={onMouseOverCallback}
    >
      {isPremium ? <PremiumAdvertisement /> : isPremium}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${id}`} onClick = {linkClickHandler}>
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`${place.isFavorite ? `place-card__bookmark-button--active` : ``} place-card__bookmark-button button`}
            type="button"
            onClick = {onButtonClickCallback}
            ref={bookmarkRef}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{place.isFavorite ? `To bookmarks` : `In bookmarks`}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: countRating(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`} onClick = {linkClickHandler}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  place: PropTypes.shape({
    isFavorite: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
    previewImage: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    location: PropTypes.object.isRequired
  }),
  handleCardMouseOver: PropTypes.func,
  onActiveOfferId: PropTypes.func.isRequired,
  onChangeActiveCard: PropTypes.func.isRequired,
  nullifyOfferLoaded: PropTypes.func.isRequired,
  isNearby: PropTypes.bool,
  authorizationStatus: PropTypes.bool,
  addToFavorites: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    authorizationStatus: getAuthorizationStatus(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  onActiveOfferId(id) {
    dispatch(setActiveOfferId(id));
  },

  nullifyOfferLoaded() {
    dispatch(nullifyIsOfferLoaded());
  },

  addToFavorites(id, status) {
    dispatch(postFavorites(id, status));
  }
});

export {PlaceCard};
export default memo(connect(mapStateToProps, mapDispatchToProps)(PlaceCard));

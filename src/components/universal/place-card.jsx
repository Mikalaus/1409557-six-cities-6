import {countRating} from '../../utils';
import PremiumAdvertisement from './premium-advertisement';
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import ActionCreator from '../../store/actions';
import Bookmark from './bookmark';

const PlaceCard = ({place, onChangeActiveCard, setActiveOfferId, nullifyIsOfferLoaded, isNearby = false}) => {

  const {title, previewImage, price, rating, type, isFavorite, isPremium, id} = place;

  const onMouseEnterCallback = () => {
    if (!isNearby) {
      onChangeActiveCard(place.location);
    }
  };

  const onMouseOverCallback = () => {
    if (!isNearby) {
      onChangeActiveCard(null);
    }
  };

  return (
    <article className={`cities__place-card place-card`}
      onMouseEnter={onMouseEnterCallback}
      onMouseLeave={onMouseOverCallback}
    >
      {isPremium ? <PremiumAdvertisement /> : isPremium}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <Bookmark id = {id} isFavorite = {isFavorite} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: countRating(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`} onClick = {
            () => {
              nullifyIsOfferLoaded();
              setActiveOfferId(id);
            }
          }>{title}</Link>
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
  setActiveOfferId: PropTypes.func.isRequired,
  onChangeActiveCard: PropTypes.func.isRequired,
  nullifyIsOfferLoaded: PropTypes.func.isRequired,
  isNearby: PropTypes.bool
};

const mapDispatchToProps = (dispatch) => ({
  setActiveOfferId(id) {
    dispatch(ActionCreator.setActiveOfferId(id));
  },

  onChangeActiveCard(place) {
    dispatch(ActionCreator.setActivePointAction(place));
  },

  nullifyIsOfferLoaded() {
    dispatch(ActionCreator.nullifyIsOfferLoaded());
  }
});

export {PlaceCard};
export default connect(null, mapDispatchToProps)(PlaceCard);

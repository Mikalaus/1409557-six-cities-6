import {countRating} from '../../utils';
import PremiumAdvertisement from './premium-advertisement';
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const PlaceCard = ({place, handleCardMouseOver}) => {

  const {title, image, price, rating, type, isFavourite, isPremium, id} = place;

  return (
    <article className="cities__place-card place-card" onMouseOverCapture = {() => {
      if (handleCardMouseOver) {
        handleCardMouseOver(place);
      }
    }}>
      {isPremium ? <PremiumAdvertisement /> : isPremium}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={image} width="260" height="200" alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`${isFavourite ? `place-card__bookmark-button--active` : isFavourite} place-card__bookmark-button button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{isFavourite ? `To bookmarks` : `In bookmarks`}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: countRating(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  place: PropTypes.shape({
    isFavourite: PropTypes.bool,
    isPremium: PropTypes.bool,
    image: PropTypes.string,
    price: PropTypes.number,
    rating: PropTypes.number,
    title: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.number
  }),
  handleCardMouseOver: PropTypes.func
};

export default PlaceCard;

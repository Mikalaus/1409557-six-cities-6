import React, {memo} from 'react';
import {connect, useSelector} from 'react-redux';
import {postFavorites} from '../../store/api-actions';
import PropTypes from 'prop-types';
import browserHistory from '../../browser-history';
import {getOffers, getOfferByIdSelector} from '../../store/main-page-data/selectors';
import {getAuthorizationStatus} from '../../store/user-info-data/selectors';
import {getFavoritesSelector} from '../../store/favorites-data/selectors';

const Bookmark = ({addToFavorites, id, authorizationStatus}) => {

  const offer = useSelector((state) => getOfferByIdSelector(state, id));

  const onButtonClickCallback = () => {
    if (authorizationStatus) {
      addToFavorites(id, !offer.isFavorite);
      offer.isFavorite = !offer.isFavorite;
    } else {
      browserHistory.push(`/login`);
    }
  };

  return (
    <button
      className={`${offer.isFavorite ? `place-card__bookmark-button--active` : ``} place-card__bookmark-button button`}
      type="button"
      onClick = {onButtonClickCallback}
    >
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{offer.isFavorite ? `To bookmarks` : `In bookmarks`}</span>
    </button>
  );
};


Bookmark.propTypes = {
  addToFavorites: PropTypes.func,
  id: PropTypes.number,
  authorizationStatus: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    offers: getOffers(state),
    authorizationStatus: getAuthorizationStatus(state),
    favorites: getFavoritesSelector(state)
  };
};

const mapDispatchToProps = {
  addToFavorites: postFavorites
};

export {Bookmark};
export default memo(connect(mapStateToProps, mapDispatchToProps)(Bookmark));

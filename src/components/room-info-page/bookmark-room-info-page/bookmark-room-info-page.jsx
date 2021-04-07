import React, {memo} from 'react';
import {connect, useSelector} from 'react-redux';
import {postFavorites} from '../../../store/api-actions';
import PropTypes from 'prop-types';
import browserHistory from '../../../browser-history';
import {getOffers, getOfferByIdSelector} from '../../../store/main-page-data/selectors';
import {getAuthorizationStatus} from '../../../store/user-info-data/selectors';

const BookmarkRoomInfoPage = ({addToFavorites, id, authorizationStatus}) => {

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
  );
};

BookmarkRoomInfoPage.propTypes = {
  addToFavorites: PropTypes.func,
  id: PropTypes.number,
  authorizationStatus: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    offers: getOffers(state),
    authorizationStatus: getAuthorizationStatus(state)
  };
};

const mapDispatchToProps = {
  addToFavorites: postFavorites
};

export {BookmarkRoomInfoPage};
export default memo(connect(mapStateToProps, mapDispatchToProps)(BookmarkRoomInfoPage));

import React from 'react';
import {connect} from 'react-redux';
import {postFavorites} from '../../store/api-actions';
import PropTypes from 'prop-types';
import browserHistory from '../../browser-history';

const Bookmark = ({addToFavorites, id, isFavorite, authorizationStatus}) => {

  const onButtonClickCallback = () => {
    if (authorizationStatus) {
      addToFavorites(id, !isFavorite);
    } else {
      browserHistory.push(`login`);
    }
  };

  return (
    <button
      className={`${isFavorite ? `place-card__bookmark-button--active` : isFavorite} place-card__bookmark-button button`}
      type="button"
      onClick = {onButtonClickCallback}
    >
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? `To bookmarks` : `In bookmarks`}</span>
    </button>
  );
};


Bookmark.propTypes = {
  addToFavorites: PropTypes.func,
  id: PropTypes.number,
  isFavorite: PropTypes.bool,
  authorizationStatus: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    offers: state.offers,
    authorizationStatus: state.authorizationStatus
  };
};

const mapDispatchToProps = {
  addToFavorites: postFavorites
};

export {Bookmark};
export default connect(mapStateToProps, mapDispatchToProps)(Bookmark);

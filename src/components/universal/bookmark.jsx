import React from 'react';
import {connect} from 'react-redux';
import {postFavorites} from '../../store/api-actions';
import PropTypes from 'prop-types';

const Bookmark = ({addToFavorites, id, isFavorite}) => {

  return (
    <button className={`${isFavorite ? `place-card__bookmark-button--active` : isFavorite} place-card__bookmark-button button`} type="button" onClick = {
      () => {
        addToFavorites(id, !isFavorite);
      }
    }>
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
  isFavorite: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    offers: state.offers
  };
};

const mapDispatchToProps = {
  addToFavorites: postFavorites
};

export {Bookmark};
export default connect(mapStateToProps, mapDispatchToProps)(Bookmark);

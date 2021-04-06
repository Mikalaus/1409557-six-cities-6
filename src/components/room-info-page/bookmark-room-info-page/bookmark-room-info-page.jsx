import React from 'react';
import {connect} from 'react-redux';
import {postFavorites} from '../../../store/api-actions';
import PropTypes from 'prop-types';

const BookmarkRoomInfoPage = ({addToFavorites, id, isFavorite}) => {

  const buttonClickHandler = () => {
    addToFavorites(id, !isFavorite);
  };

  return (
    <button
      className={
        `${isFavorite ? `property__bookmark-button--active` : isFavorite}
        property__bookmark-button button`}
      type="button"
      onClick = {buttonClickHandler}
    >
      <svg className="property__bookmark-icon" width="31" height="33">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? `To bookmarks` : `In bookmarks`}</span>
    </button>
  );
};

BookmarkRoomInfoPage.propTypes = {
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

export {BookmarkRoomInfoPage};
export default connect(mapStateToProps, mapDispatchToProps)(BookmarkRoomInfoPage);

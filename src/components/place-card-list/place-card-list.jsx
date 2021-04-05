import React, {useState} from 'react';
import PlaceCard from '../universal/place-card';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ActionCreator from '../../store/actions';

const PlaceCardList = ({offers, setActivePoint}) => {

  const [cardActive = {
    latitude: 0,
    longitude: 0,
    zoom: 0
  }, setActiveCard] = useState();

  const handleCardMouseOver = (place) => {
    setActiveCard(place);
    setActivePoint(cardActive.location);
  };

  return (
    <>
      {
        offers.map((place) => {
          return (
            <PlaceCard
              place={place}
              handleCardMouseOver={handleCardMouseOver}
              key={place.id}
            />
          );
        })
      }
    </>
  );
};

PlaceCardList.propTypes = {
  offers: PropTypes.arrayOf(
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
  setActivePoint: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  setActivePoint(point) {
    dispatch(ActionCreator.setActivePointAction(point));
  }
});

const mapStateToProps = (state) => {
  return {
    offers: state.sortedOffers
  };
};

export {PlaceCardList};
export default connect(mapStateToProps, mapDispatchToProps)(PlaceCardList);

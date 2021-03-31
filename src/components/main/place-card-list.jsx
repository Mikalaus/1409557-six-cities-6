import React, {useState} from 'react';
import PlaceCard from '../universal/place-card';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import mapDispatchToProps from '../../store/dispatch-to-props';
import {connect} from 'react-redux';
import mapStateToProps from '../../store/state-to-props';

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
              key={nanoid()}
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

const placeCardListDispatch = mapDispatchToProps(`PlaceCardList`);
const placeCardListState = mapStateToProps(`PlaceCardsList`);

export {PlaceCardList};
export default connect(placeCardListState, placeCardListDispatch)(PlaceCardList);

import React, {useState} from 'react';
import PlaceCard from '../universal/place-card';
import PropTypes from 'prop-types';

const PlaceCardList = ({placesList}) => {

  const [cardActive, setActiveCard] = useState(placesList[0]);

  const handleCardMouseOver = (place) => {
    setActiveCard(place);
  };

  return (
    <>
      {
        placesList.map((place) => {
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
  placesList: PropTypes.arrayOf(
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
  )
};

export default PlaceCardList;

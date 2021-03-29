import React, {useState} from 'react';
import PlaceCard from '../universal/place-card';

const PlaceCardList = ({placesList}) => {

  const [cardActive, setActiveCard] = useState(placesList[0]);

  const handleCardMouseOver = (place) => {
    setActiveCard(place);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
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
    </div>
  );
};

export default PlaceCardList;

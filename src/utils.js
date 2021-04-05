const countRating = (rating) => {
  return `${Math.round(rating) / 5 * 100}%`;
};

const getPinsForCurrentCity = (activeCity, offers) => {
  const pinsForCurrentCity = [];
  offers.forEach((place) => {
    if (place.city.name === activeCity) {
      pinsForCurrentCity.push({location: place.location, title: place.title});
    }
  });
  return pinsForCurrentCity;
};

const getOffersForCurrentCity = (activeCity, offers) => {
  const offersForCurrentCity = [];
  offers.forEach((place) => {
    if (place.city.name === activeCity) {
      offersForCurrentCity.push(place);
    }
  });
  return offersForCurrentCity;
};

export {
  countRating,
  getPinsForCurrentCity,
  getOffersForCurrentCity
};

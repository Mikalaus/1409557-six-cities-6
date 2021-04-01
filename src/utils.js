const countRating = (rating) => {
  return `${rating / 5 * 100}%`;
};

const getPinsForCurrentCity = (activeCity, offers) => {
  const pinsForCurrentCity = [];
  offers.forEach((place) => {
    if (place.city.name === activeCity) {
      pinsForCurrentCity.push(place.location);
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

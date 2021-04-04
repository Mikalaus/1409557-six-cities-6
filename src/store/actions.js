const ActionType = {
  SET_CITY_NAME: `main-page/setCityName`,
  SET_CITY_LOCATION: `main-page/setCityLocation`,
  SET_OFFERS: `main-page/setOffers`,
  SET_SORTED_OFFERS: `main-page/setSortedOffers`,
  SET_ACTIVE_POINT: `main-page/setActivePoint`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  REDIRECT_TO_ROUTE: `login/redirectToRoute`,
  SET_ACTIVE_OFFER: `room-info-page/setActiveOffer`,
  SET_NEARBY: `room-info-page/setNearby`,
  SET_REVIEWS: `room-info-page/setReviews`,
  NULLIFUY_IS_OFFER_LOADED: `room-info-page/nullifyIsOfferLoaded`,
  SET_ACTIVE_OFFER_ID: `place-card/setActiveOfferId`,
  ADD_USER_REVIEW: `room-info-page/addUserReview`,
  SET_FAVORITES: `favorites/setFavorites`,
  REQUIRE_FAVORITES_LOADED: `favorites/requireFavoritesLoaded`,
  CHANGE_FAVORITE_STATUS: `place-card/changeFavoriteStatus`
};

const ActionCreator = {
  setCityNameAction: (city) => ({type: ActionType.SET_CITY_NAME, payload: city}),
  setCityLocationAction: (location) => ({type: ActionType.SET_CITY_LOCATION, payload: location}),
  setOffersAction: (offers) => ({type: ActionType.SET_OFFERS, payload: offers}),
  setSortedOffersAction: (offers) => ({type: ActionType.SET_SORTED_OFFERS, payload: offers}),
  setActivePointAction: (point) => ({type: ActionType.SET_ACTIVE_POINT, payload: point}),
  requireAuthorization: (status) => ({type: ActionType.REQUIRED_AUTHORIZATION, payload: status}),
  redirectToRoute: (url) => ({type: ActionType.REDIRECT_TO_ROUTE, payload: url}),
  setActiveOffer: (offer) => ({type: ActionType.SET_ACTIVE_OFFER, payload: offer}),
  setNearby: (nearby) => ({type: ActionType.SET_NEARBY, payload: nearby}),
  setReviews: (reviews) => ({type: ActionType.SET_REVIEWS, payload: reviews}),
  nullifyIsOfferLoaded: () => ({type: ActionType.NULLIFUY_IS_OFFER_LOADED}),
  setActiveOfferId: (id) => ({type: ActionType.SET_ACTIVE_OFFER_ID, payload: id}),
  addUserReview: (review) => ({type: ActionType.ADD_USER_REVIEW, payload: review}),
  setFavorites: (favorites) => ({type: ActionType.SET_FAVORITES, payload: favorites}),
  requireFavoritesLoaded: (status) => ({type: ActionType.REQUIRE_FAVORITES_LOADED, payload: status}),
  changeFavoriteStatus: (offer) => ({type: ActionType.CHANGE_FAVORITE_STATUS, payload: offer})
};

export default ActionCreator;
export {ActionType};

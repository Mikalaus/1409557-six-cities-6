const ActionType = {
  SET_CITY_NAME: `main-page/setCityName`,
  SET_CITY_LOCATION: `main-page/setCityLocation`,
  SET_OFFERS: `main-page/setOffers`,
  SET_SORTED_OFFERS: `main-page/setSortedOffers`,
  SET_ACTIVE_POINT: `main-page/setActivePoint`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  REDIRECT_TO_ROUTE: `login/redirectToRoute`,
};

const ActionCreator = {
  setCityNameAction: (city) => ({type: ActionType.SET_CITY_NAME, payload: city}),
  setCityLocationAction: (location) => ({type: ActionType.SET_CITY_LOCATION, payload: location}),
  setOffersAction: (offers) => ({type: ActionType.SET_OFFERS, payload: offers}),
  setSortedOffersAction: (offers) => ({type: ActionType.SET_SORTED_OFFERS, payload: offers}),
  setActivePointAction: (point) => ({type: ActionType.SET_ACTIVE_POINT, payload: point}),
  requireAuthorization: (status) => ({type: ActionType.REQUIRED_AUTHORIZATION, payload: status}),
  redirectToRoute: (url) => ({type: ActionType.REDIRECT_TO_ROUTE, payload: url})
};

export default ActionCreator;
export {ActionType};

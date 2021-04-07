export const ActionType = {
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
  CHANGE_FAVORITE_STATUS: `place-card/changeFavoriteStatus`,
  SET_USER_INFO: `header/setUserInfo`,
  CATCH_ERROR_POST_USER_REVIEW: `comment-form/isReviewPostedError`
};

export const setCityNameAction = (city) => ({type: ActionType.SET_CITY_NAME, payload: city});

export const setCityLocationAction = (location) => ({type: ActionType.SET_CITY_LOCATION, payload: location});

export const setOffersAction = (offers) => ({type: ActionType.SET_OFFERS, payload: offers});

export const setSortedOffersAction = (offers) => ({type: ActionType.SET_SORTED_OFFERS, payload: offers});

export const setActivePointAction = (point) => ({type: ActionType.SET_ACTIVE_POINT, payload: point});

export const requireAuthorization = (status) => ({type: ActionType.REQUIRED_AUTHORIZATION, payload: status});

export const redirectToRoute = (url) => ({type: ActionType.REDIRECT_TO_ROUTE, payload: url});

export const setActiveOfferAction = (id) => ({type: ActionType.SET_ACTIVE_OFFER, payload: id});

export const setNearby = (nearby) => ({type: ActionType.SET_NEARBY, payload: nearby});

export const setReviews = (reviews) => ({type: ActionType.SET_REVIEWS, payload: reviews});

export const nullifyIsOfferLoaded = () => ({type: ActionType.NULLIFUY_IS_OFFER_LOADED});

export const setActiveOfferId = (id) => ({type: ActionType.SET_ACTIVE_OFFER_ID, payload: id});

export const addUserReview = (review) => ({type: ActionType.ADD_USER_REVIEW, payload: review});

export const setFavorites = (favorites) => ({type: ActionType.SET_FAVORITES, payload: favorites});

export const requireFavoritesLoaded = (status) => ({type: ActionType.REQUIRE_FAVORITES_LOADED, payload: status});

export const changeFavoriteStatus = (offer) => ({type: ActionType.CHANGE_FAVORITE_STATUS, payload: offer});

export const setUserInfo = (info) => ({type: ActionType.SET_USER_INFO, payload: info});

export const catchErrorPostUserReview = (status) => ({type: ActionType.CATCH_ERROR_POST_USER_REVIEW, payload: status});

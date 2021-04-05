import {ActionType} from './actions';
import {getOffersForCurrentCity} from '../utils';
import {CitiesLocation, AuthorizationStatus} from '../constants';

const initialState = {
  cityName: `Paris`,
  cityLocation: CitiesLocation.get(`Paris`),
  offers: [],
  activePoint: {},
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  isOffersLoaded: false,
  sortedOffers: [],
  activeOffer: {},
  isReviewPosted: false,
  activeOfferId: 0,
  isOfferLoaded: false,
  nearby: [],
  reviews: [],
  favorites: [],
  isFavoritesLoaded: false,
  userInfo: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_CITY_NAME:
      return {
        ...state,
        cityName: action.payload
      };

    case ActionType.SET_CITY_LOCATION:
      return {
        ...state,
        cityLocation: action.payload
      };

    case ActionType.SET_OFFERS:
      return {
        ...state,
        offers: action.payload,
        sortedOffers: getOffersForCurrentCity(state.cityName, action.payload),
        isOffersLoaded: true
      };

    case ActionType.SET_SORTED_OFFERS:
      return {
        ...state,
        sortedOffers: action.payload,
      };

    case ActionType.SET_ACTIVE_POINT:
      return {
        ...state,
        activePoint: action.payload
      };

    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload
      };

    case ActionType.SET_ACTIVE_OFFER:
      return {
        ...state,
        activeOffer: action.payload,
        isOfferLoaded: true
      };

    case ActionType.SET_REVIEWS:
      return {
        ...state,
        reviews: action.payload
      };

    case ActionType.SET_NEARBY:
      return {
        ...state,
        nearby: action.payload
      };

    case ActionType.NULLIFUY_IS_OFFER_LOADED:
      return {
        ...state,
        isOfferLoaded: false
      };

    case ActionType.SET_ACTIVE_OFFER_ID:
      return {
        ...state,
        activeOfferId: action.payload
      };

    case ActionType.ADD_USER_REVIEW:
      return {
        ...state,
        reviews: [action.payload, ...state.reviews]
      };

    case ActionType.SET_FAVORITES:
      return {
        ...state,
        favorites: action.payload,
        isOffersLoaded: false,
        isOfferLoaded: false
      };

    case ActionType.REQUIRE_FAVORITES_LOADED:
      return {
        ...state,
        isFavoritesLoaded: action.payload
      };

    case ActionType.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload
      };

    default:
      return (state);
  }
};

export {initialState};
export default reducer;

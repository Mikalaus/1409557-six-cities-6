import {ActionType} from './actions';
import {getOffersForCurrentCity} from '../utils';
import {CitiesLocation, AuthorizationStatus} from '../const';

const initialState = {
  cityName: `Paris`,
  cityLocation: CitiesLocation.get(`Paris`),
  offers: [],
  activePoint: {},
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  isOffersLoaded: false,
  sortedOffers: []
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
        sortedOffers: getOffersForCurrentCity(`Paris`, action.payload),
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

    default:
      return (state);
  }
};

export {initialState};
export default reducer;

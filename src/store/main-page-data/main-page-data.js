import {ActionType} from '../actions';
import {CitiesLocation} from '../../constants';
import {getOffersForCurrentCity} from '../../utils';

const initialState = {
  cityName: `Paris`,
  cityLocation: CitiesLocation.get(`Paris`),
  offers: [],
  activePoint: {},
  isOffersLoaded: false,
  sortedOffers: [],
};

export const mainPage = (state = initialState, action) => {
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
  }

  return state;
};

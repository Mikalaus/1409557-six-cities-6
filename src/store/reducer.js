import {ActionType} from './action';
import {getOffersForCurrentCity} from '../utils';

const initialState = {
  cityName: `Paris`,
  cityLocation: {
    latitude: 52.38333,
    longitude: 4.9,
    zoom: 10
  },
  offers: getOffersForCurrentCity(`Paris`),
  activePoint: {}
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
        offers: action.payload
      };

    case ActionType.SET_ACTIVE_POINT:
      return {
        ...state,
        activePoint: action.payload
      };

    default:
      return (state);
  }
};

export {initialState};
export default reducer;

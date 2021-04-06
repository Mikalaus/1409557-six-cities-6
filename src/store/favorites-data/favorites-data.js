import {ActionType} from '../actions';

const initialState = {
  favorites: [],
  isFavoritesLoaded: false,
};

export const favoritesData = (state = initialState, action) => {
  switch (action.type) {
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

  }

  return state;
};

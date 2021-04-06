import {ActionType} from '../actions';

const initialState = {
  activeOffer: {},
  isReviewPosted: false,
  activeOfferId: 0,
  isOfferLoaded: false,
  nearby: [],
  reviews: [],
};

export const roomInfoPage = (state = initialState, action) => {
  switch (action.type) {
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
  }

  return state;
};

import {NameSpace} from '../reducer';
import {createSelector} from 'reselect';

export const getCityName = (state) => state[NameSpace.MAIN].cityName;
export const getCityLocation = (state) => state[NameSpace.MAIN].cityLocation;
export const getOffers = (state) => state[NameSpace.MAIN].offers;
export const getActivePoint = (state) => state[NameSpace.MAIN].activePoint;
export const getIsOffersLoaded = (state) => state[NameSpace.MAIN].isOffersLoaded;
export const getSortedOffers = (state) => state[NameSpace.MAIN].sortedOffers;

const getActiveOfferId = (_state, id) => id;

export const getOfferByIdSelector = createSelector(
    [getOffers, getActiveOfferId],
    (offers, id) => {
      if (Array.isArray(offers)) {
        return offers.find((offer) => offer.id === id);
      }
      return null;
    }
);

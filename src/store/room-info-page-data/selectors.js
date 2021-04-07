import {NameSpace} from '../reducer';

export const getActiveOffer = (state) => state[NameSpace.OFFER].activeOffer;
export const getIsReviewPosted = (state) => state[NameSpace.OFFER].isReviewPosted;
export const getIsReviewPostedError = (state) => state[NameSpace.OFFER].isReviewPostedError;
export const getActiveOfferId = (state) => state[NameSpace.OFFER].activeOfferId;
export const getNearby = (state) => state[NameSpace.OFFER].nearby;
export const getIsOfferLoaded = (state) => state[NameSpace.OFFER].isOfferLoaded;
export const getReviews = (state) => state[NameSpace.OFFER].reviews;

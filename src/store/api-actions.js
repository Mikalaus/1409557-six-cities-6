import ActionCreator from "./actions";
import {AuthorizationStatus} from "../constants";
import {adaptOffersToClient, adaptOffer, adaptReview, adaptUserInfo} from '../services/adapter';
import browserHistory from '../browser-history';

export const fetchOffersList = () => (dispatch, _getState, api) => (
  api.get(`hotels`)
    .then(({data}) => adaptOffersToClient(data)))
    .then((offers) => dispatch(ActionCreator.setOffersAction(offers)));

export const fetchOffer = (id) => (dispatch, _getState, api) => (
  Promise.all([
    api.get(`hotels/${id}`),
    api.get(`hotels/${id}/nearby`),
    api.get(`comments/${id}`)
  ])
    .then(([offer, nearby, reviews]) => {
      dispatch(ActionCreator.setNearby(nearby.data.map(adaptOffer)));
      dispatch(ActionCreator.setReviews(reviews.data.map(adaptReview)));
      dispatch(ActionCreator.setActiveOffer(adaptOffer(offer.data)));
    })
  .catch(() => browserHistory.push(`/`))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(`login`)
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => browserHistory.push(`/favourites`))
    .catch(() => browserHistory.push(`/login`))
);

export const getUserInfo = () => (dispatch, _getState, api) => (
  api.get(`login`)
    .then(({data}) => adaptUserInfo(data))
    .then((userInfo) => dispatch(ActionCreator.setUserInfo(userInfo)))
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
);

export const login = (user) => (dispatch, _getState, api) => (
  api.post(`login`, user)
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(ActionCreator.redirectToRoute(`/`)))
);

export const logout = () => (dispatch, _getState, api) => (
  api.get(`logout`)
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)))
);

export const getComments = (id) => (dispatch, _getState, api) => (
  api.get(`comments/${id}`)
    .then((reviews) => dispatch(ActionCreator.setReviews(reviews.data.map(adaptReview))))
);

export const postUserComment = (id, data) => (dispatch, _getState, api) => (
  api.post(`comments/${id}`, data)
    .then(() => api.get(`comments/${id}`)
      .then((reviews) => dispatch(ActionCreator.setReviews(reviews.data.map(adaptReview))))));

export const getFavorites = () => (dispatch, _getState, api) => (
  api.get(`favorite`)
    .then((favorites) => dispatch(ActionCreator.setFavorites(favorites.data.map(adaptOffer))))
    .then(() => dispatch(ActionCreator.requireFavoritesLoaded(true))));

export const postFavorites = (id, status) => (dispatch, _getState, api) => {

  return api.post(`favorite/${id}/${Number(status)}`)
    .then(() => api.get(`favorite`))
    .then((favorites) => dispatch(ActionCreator.setFavorites(favorites.data.map(adaptOffer))));
};

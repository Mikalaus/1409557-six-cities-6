import ActionCreator from "./actions";
import {AuthorizationStatus} from "../const";
import {adaptOffersToClient, adaptOfferToClient} from '../services/adapter';

export const fetchOffersList = () => (dispatch, _getState, api) => (
  api.get(`/hotels`)
    .then(({data}) => adaptOffersToClient(data)))
    .then((offers) => dispatch(ActionCreator.setOffersAction(offers)));

export const fetchOffer = (id) => (dispatch, _getState, api) => (
  api.get(`/hotels/${id}`)
    .then(({offer}) => adaptOfferToClient(offer)));

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(`/login`)
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(`/login`, {email, password})
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
);

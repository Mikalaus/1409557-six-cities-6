import {ActionType} from '../actions';
import {AuthorizationStatus} from '../../constants';

const initialState = {
  userInfo: {},
  authorizationStatus: AuthorizationStatus.NO_AUTH,
};

export const userInfo = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload
      };

    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload
      };
  }

  return state;
};

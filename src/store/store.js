import createAPI from '../services/api';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import ActionCreator from './actions';
import {AuthorizationStatus} from '../constants';
import {redirect} from './middlewares/redirect';

const api = createAPI(
    () => store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH))
);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api)),
        applyMiddleware(redirect)
    )
);

export default store;

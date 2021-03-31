import HOTELS_INFO from './mocs/offers';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/main/app';
import store from './store/store';
import {Provider} from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
      <App placesList={ HOTELS_INFO }/>,
    </Provider>,
    document.querySelector(`#root`)
);

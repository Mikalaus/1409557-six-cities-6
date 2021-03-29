import HOTELS_INFO from './mocs/offers';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/main/app';


ReactDOM.render(
    <App placesList={ HOTELS_INFO }/>,
    document.querySelector(`#root`)
);

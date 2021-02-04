import HOTELS_INFO from './mocs';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';


ReactDOM.render(
    <App placesList={ HOTELS_INFO }/>,
    document.querySelector(`#root`)
);

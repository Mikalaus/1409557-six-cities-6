import SignInPage from '../sign-in/sign-in-page';
import React from 'react';
import MainPage from './main-page';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Error404Page from '../error-404-page/error-404-page';
import RoomInfoPage from '../room/room-info-page';
import FavouritesPage from '../favourites/favourites';

const App = ({placesList}) => (
  <BrowserRouter>
    <Switch>

      <Route exact path="/login">
        <SignInPage />
      </Route>

      <Route exact path="/">
        <MainPage placesList={placesList} />
      </Route>

      <Route exact path="/favourites">
        <FavouritesPage />
      </Route>

      <Route exact path="/offer/:id">
        <RoomInfoPage />
      </Route>

      <Route>
        <Error404Page />
      </Route>

    </Switch>
  </BrowserRouter>
);

App.propTypes = {
  placesList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        isFavourite: PropTypes.bool.isRequired,
        isPremium: PropTypes.bool.isRequired,
        previewImage: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
      })
  )
};

export default App;

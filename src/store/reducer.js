import {combineReducers} from 'redux';
import {favoritesData} from './favorites-data/favorites-data';
import {roomInfoPage} from './room-info-page-data/room-info-page-data';
import {userInfo} from './user-info-data/user-info-data';
import {mainPage} from './main-page-data/main-page-data';

export const NameSpace = {
  MAIN: `MAIN`,
  FAVORITES: `FAVORITES`,
  OFFER: `OFFER`,
  USER: `USER`
};

export default combineReducers({
  [NameSpace.MAIN]: mainPage,
  [NameSpace.FAVORITES]: favoritesData,
  [NameSpace.OFFER]: roomInfoPage,
  [NameSpace.USER]: userInfo,
});

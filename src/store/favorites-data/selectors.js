import {NameSpace} from '../reducer';

export const getFavoritesSelector = (state) => state[NameSpace.FAVORITES].favorites;
export const getLoadedFavoritesStatus = (state) => state[NameSpace.FAVORITES].isFavoritesLoaded;

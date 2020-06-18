import {ADD_FAVOURITE, REMOVE_FAVOURITE} from '../actions/FavouriteActions';

const INITIAL_STATE = {
  favourites: new Map(),
};

/**
 * Reducer to deal with actions related to Favourite movies
 */
function FavouriteReducer(state = INITIAL_STATE, action) {
  const {favourites} = state;
  const newFav = new Map(favourites);
  const {type, payload} = action;
  switch (type) {
    case ADD_FAVOURITE:
      if (!newFav.has(payload.imdbID)) {
        newFav.set(payload.imdbID, payload);
      }
      return {favourites: newFav};
    case REMOVE_FAVOURITE:
      if (newFav.has(payload.imdbID)) {
        newFav.delete(payload.imdbID);
      }
      return {favourites: newFav};
    default:
      console.warn('No state defined for this action');
      return state;
  }
}

export default FavouriteReducer;

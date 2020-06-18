import {useDispatch} from 'react-redux';
export const ADD_FAVOURITE = 'add_fav';
export const REMOVE_FAVOURITE = 'remove_fav';

/**
 * Action creators for Favourite Movies
 */

export function addMovieToFavourite(movie) {
  return {
    type: ADD_FAVOURITE,
    payload: movie,
  };
}

export function removeMovieFromFavourite(movie) {
  return {
    type: REMOVE_FAVOURITE,
    payload: movie,
  };
}

/**
 * Hook to create action dispatcher
 */
export function useFavourites() {
  const dispatch = useDispatch();
  const onLike = movie => dispatch(addMovieToFavourite(movie));
  const onDislike = movie => dispatch(removeMovieFromFavourite(movie));
  return {
    onLike,
    onDislike,
  };
}

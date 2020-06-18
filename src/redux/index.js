import {createStore} from 'redux';
import Favourite from './reducers/FavouriteReducer';

const store = createStore(Favourite);

export default store;
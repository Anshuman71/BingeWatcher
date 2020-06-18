import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  Image,
  Keyboard,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import debounce from 'lodash.debounce';
import {screenWidth, API_ENDPOINT, theme} from '../utils/constants';
import MovieCard, {UniqueKey} from '../components/MovieCard';
import {useFavourites} from '../redux/actions/FavouriteActions';
import CommonStyles from '../utils/styles';
import { set } from 'react-native-reanimated';

const NO_RESULTS = require('../assets/empty.png');
const SEARCH = require('../assets/search_default.png');

function SearchScreen() {
  const [query, setQuery] = useState('');
  const inputRef = useRef();
  const favourites = useSelector(state => state.favourites);
  const [isLoading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const onChangeQuery = useCallback(val => setQuery(val), []);
  const {onLike, onDislike} = useFavourites();

  const renderItem = useCallback(
    ({item}) => {
      let isLiked = favourites.has(item.imdbID);
      return MovieCard({item: {...item, isLiked}, onLike, onDislike});
    },
    [favourites],
  );
  const blurInput = useCallback(() => inputRef.current.blur());

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', blurInput);
    return () => Keyboard.removeListener('keyboardDidHide', blurInput);
  });

  useEffect(() => {
    async function getMovies() {
      setLoading(true);
      const result = await fetch(`${API_ENDPOINT}${query}`);
      const {Search} = await result.json();
      if (Search) {
        setMovies(Search);
      } else {
        setMovies([]);
      }
      setLoading(false);
    }
    const debouncedQuery = debounce(getMovies, 500);
    if (query.length) {
      debouncedQuery();
    } else {
      setMovies([]);
    }
  }, [query]);

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Search Movies</Text>
      <View style={styles.input}>
        <Image
          source={require('../assets/search.png')}
          style={styles.searchIcon}
        />
        <TextInput
          ref={inputRef}
          returnKeyType="done"
          placeholder="An awesome movie name"
          value={query}
          onChangeText={onChangeQuery}
        />
      </View>
      {isLoading ? (
        <>
          <ActivityIndicator
            color={theme.primary}
            size="large"
            animating={isLoading}
          />
          <Text style={{marginTop: 10}}>Finding movies for you</Text>
        </>
      ) : movies.length ? (
        <FlatList
          numColumns={2}
          data={movies}
          style={styles.list}
          keyExtractor={UniqueKey}
          renderItem={renderItem}
        />
      ) : (
        <View style={styles.defaultView}>
          <Image
            resizeMode="contain"
            source={query ? NO_RESULTS : SEARCH}
            style={styles.image}
          />
          <Text style={styles.message}>
            {query ? 'No movies found' : 'Start typing to serach movies'}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  ...CommonStyles,
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    width: screenWidth * 0.9,
    borderRadius: 4,
    borderColor: theme.secondary,
    height: 50,
    marginBottom: 20,
    paddingLeft: 5,
    borderWidth: 2,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
    marginRight: 20,
  },
  list: {paddingLeft: 5},
});

export default SearchScreen;

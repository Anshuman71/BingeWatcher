import React, {useCallback} from 'react';
import {View, Image, StyleSheet, Text, FlatList} from 'react-native';
import MovieCard, {UniqueKey} from '../components/MovieCard';
import {useSelector} from 'react-redux';
import {useFavourites} from '../redux/actions/FavouriteActions';
import CommonStyles from '../utils/styles';

function getFavourites({favourites}) {
  const movies = [...favourites].map(item => ({...item[1], isLiked: true}));
  return {movies, favourites};
}

const NO_RESULTS = require('../assets/empty.png');

function FavouritesScreen() {
  const {movies, favourites} = useSelector(getFavourites);
  const {onLike, onDislike} = useFavourites();

  const renderItem = useCallback(
    ({item}) => {
      let isLiked = favourites.has(item.imdbID);
      return MovieCard({item: {...item, isLiked}, onLike, onDislike});
    },
    [favourites],
  );

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Favourites</Text>
      {movies.length ? (
        <FlatList
          numColumns={2}
          data={movies}
          keyExtractor={UniqueKey}
          renderItem={renderItem}
        />
      ) : (
        <View style={styles.defaultView}>
          <Image
            resizeMode="contain"
            source={NO_RESULTS}
            style={styles.image}
          />
          <Text style={styles.message}>Seems like you don't like movies!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  ...CommonStyles,
});

export default FavouritesScreen;

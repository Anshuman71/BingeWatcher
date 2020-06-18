import React from 'react';
import {
  View,
  ToastAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  screenWidth,
  screenHeight,
  DEFAULT_IMAGE,
  theme,
} from '../utils/constants';

const CARD_HEIGHT = screenHeight * 0.3;
const CARD_WIDTH = screenWidth * 0.45;
const heart_outline = require('../assets/heart.png');
const heart_filled = require('../assets/heart_filled.png');

export function UniqueKey(item) {
  return item.imdbID;
}

/**
 * Function returning MovieCard
 */
function MovieCard({item, onLike, onDislike}) {
  const movie = {...item};

  // use default poster, if not available with movie
  if (!movie.Poster || movie.Poster === 'N/A') {
    movie.Poster = DEFAULT_IMAGE;
  }
  function onPress() {
    if (item.isLiked) {
      onDislike(item);
      ToastAndroid.show('Movie removed from favourites', ToastAndroid.SHORT);
    } else {
      onLike(item);
      ToastAndroid.show('Movie added from favourites', ToastAndroid.SHORT);
    }
  }

  return (
    <View key={movie.imdbID} style={styles.card}>
      <Image style={styles.poster} source={{uri: movie.Poster}} />
      <Text style={styles.title} numberOfLines={2}>
        {movie.Title}, {movie.Year}
      </Text>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.heartButton}
        onPress={onPress}>
        <Image
          resizeMode="contain"
          style={styles.heartIcon}
          source={item.isLiked ? heart_filled : heart_outline}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    elevation: 5,
    height: CARD_HEIGHT,
    marginBottom: 20,
    overflow: 'hidden',
    backgroundColor: theme.white,
    marginRight: 10,
    borderRadius: 5,
    width: CARD_WIDTH,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    color: theme.dark,
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  heartButton: {
    width: 50,
    position: 'absolute',
    top: 5,
    right: 10,
    height: 50,
  },
  poster: {width: '100%', height: '75%', marginBottom: 5},
  heartIcon: {width: 24, alignSelf: 'flex-end', height: 24},
});

export default MovieCard;

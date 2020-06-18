import {Dimensions} from 'react-native';
const deviceWindow = Dimensions.get('window');

export const API_ENDPOINT = `http://www.omdbapi.com/?type=movie&apikey=a1b5f9ec&s=`;
export const DEFAULT_IMAGE =
  'https://critics.io/img/movies/poster-placeholder.png';
export const screenWidth = deviceWindow.width;
export const screenHeight = deviceWindow.height;

export const theme = {
  grayLight: '#F7FAFC',
  gray: '#EBF8FF',
  grayDark: '#E2E8F0',
  white: '#FFFFF0',
  dark: '#4A5568',
  black: '#1A202C',
  primary: '#1B9CFC',
  secondary: '#90CDF4',
};

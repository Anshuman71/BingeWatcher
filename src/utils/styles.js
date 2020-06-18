import {theme} from '../utils/constants';
/**
 * Common styles which are used in multiple components
 */
const styles = {
  screenContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: theme.gray,
  },
  screenTitle: {
    fontSize: 28,
    color: theme.primary,
    fontWeight: '600',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.dark,
  },
  image: {width: '80%', borderRadius: 10, height: '70%'},
  defaultView: {
    width: '100%',
    alignItems: 'center',
  },
};

export default styles;

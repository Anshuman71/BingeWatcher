# BingeWatcher

The app is a tiny project to showcase react-native and redux use-case.

## Setting up locally

1. Clone the repo
2. `$ cd BingeWatcher && yarn install`
3. Open android emulator
4. `$ yarn android`
5. To make release build run `$ cd yarn build:android`

## Implementation

- We have 2 screens based in `BottomTabNavigator`, provided by `ReactNavigation`.
- The `SearchScreen` provides functionality to search the movies and adding a movie to _favourites_, which are maintained in `Redux-Store`.
- The `FavouritesScreen` en-lists all the favourite movies.

## Output
- Android installable files (apk)
- Universal APK size ~24MB, Platform wise split APK size ~8MB
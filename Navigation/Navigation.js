import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import React from 'react';
import { StyleSheet, Image } from 'react-native';
import Search from '../Components/Search';
import FilmDetails from '../Components/FilmDetails';
import Favorites from '../Components/Favorites';
import News from '../Components/News';

const NewsStackNavigator = createStackNavigator({
  News: {
    screen: News,
    navigationOptions: {
      title: 'Les derniers films',
      headerStyle: {
        backgroundColor: '#852f8b',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },  
    },
    FilmDetails: {
      screen: FilmDetails,
      navigationOptions: {
        title: 'Les derniers films',
        headerStyle: {
          backgroundColor: '#852f8b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }
    }
  }
})

const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Rechercher',
      headerStyle: {
        backgroundColor: '#852f8b',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  },
  FilmDetails: {
    screen: FilmDetails,
    navigationOptions: {
      title: 'Rechercher',
      headerStyle: {
        backgroundColor: '#852f8b',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
})

const FavoritesStackNavigator = createStackNavigator(
  {
    Favorites: {
      screen: Favorites,
      navigationOptions: {
        title: 'Mes films favoris',
        headerStyle: {
          backgroundColor: '#852f8b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }
    },
    FilmDetails: {
      screen: FilmDetails,
      navigationOptions: {
        title: 'Mes films favoris',
        headerStyle: {
          backgroundColor: '#852f8b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }
    }
})

const MoviesTabNavigator =  createBottomTabNavigator(
  { 
    News: {
      screen: NewsStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
              source={require('../Images/star.png')}
              style={styles.icon}/>
        }
      }
    },
    Search: {
      screen: SearchStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            style={styles.icon}
            source={require('../Images/search.png')}/>
        }
      }
    },
    Favorites: {
      screen: FavoritesStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            style={styles.icon}
            source={require('../Images/love-white.png')}/>
        }
      }
    },
  },
  {
    tabBarOptions: {
      activeBackgroundColor: "#6B2270",
      inactiveBackgroundColor: "#852f8b",
      showIcon: true,
      showLabel: false
    }
  } 
)

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25
  }
})

export default createAppContainer(MoviesTabNavigator)
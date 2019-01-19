import { AppRegistry } from 'react-native';
import App from './App';
import {YellowBox} from 'react-native'
YellowBox.ignoreWarnings([
  'Require cycle: node_modules/react-native-gesture-handler/GestureHandler.js -> node_modules/react-native-gesture-handler/Swipeable.js -> node_modules/react-native-gesture-handler/GestureHandler.js Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle.',   
])
AppRegistry.registerComponent('MoviesAndMe', () => App);
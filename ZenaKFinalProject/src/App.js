import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './home';
import Header from './header';
import Lyrics from "./components/tracks/Lyrics"

class App extends React.Component {
  render() {
    return (
      <View style={styles.appContainer}>
        <Header title="Random People" />
        <Home />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
    path: '/'
  },
  Lyrics: {
    screen: Lyrics,
    path: "/lyrics/track/:id"
  }
});

AppRegistry.registerComponent('App', () => App);

export default App;

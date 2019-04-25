import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  AppRegistry,
  StyleSheet,
  View,
} from 'react-native';
import Home from './src/home';
import Header from './src/header';
import Lyrics from "./src/components/tracks/Lyrics";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Index from "./src/components/layout/Index";
// import Lyrics from "./src/components/tracks/Lyrics";

class App extends React.Component {
  render() {
    return (
      <View style={styles.appContainer}>
        <Header title="Playlists For Friends" />
        <Home />
        <Route exact path="/lyrics/track/:id" component={Lyrics} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

AppRegistry.registerComponent("App", () => App);

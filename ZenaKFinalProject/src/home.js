import React from "react";
import { ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import axios from 'axios'
import ResultsHeader from "./components/layout/ResultsHeader";
import Tracks from "./components/tracks/tracks";

class Home extends React.Component {

  state = {
    track_list: [],
    heading: 'Top 10 Tracks',
    loading: true
  };

  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${
        process.env.REACT_APP_MM_KEY
        }`
      )
      .then(res => {
        // console.log(res.data);
        this.setState({ track_list: res.data.message.body.track_list, loading: false });
      })
      .catch(err => console.log(err));
  }


  render() {
    return (
      <ScrollView noSpacer={true} noScroll={true} style={styles.container}>
        <ResultsHeader title="Top 10 Tracks" />
        {this.state.loading ? (
          <ActivityIndicator
            style={[styles.centering]}
            color="#ff8179"
            size="large"
          />
        ) : (
            //placeholder
            <Tracks track_list={this.state.track_list} heading={this.state.heading} />
            // <ResultsHeader title="Top 10 Tracks" />
          )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "whitesmoke"
  },
  centering: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    height: "100vh"
  }
});

export default Home;

import React, { Component } from 'react';
import axios from 'axios';
import Firebase from "./Firebase";

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_TRACKS':
      return {
        ...state,
        track_list: action.payload,
        heading: 'Search Results'
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    track_list: [],
    heading: 'Top 10 Tracks',
    dispatch: action => this.setState(state => reducer(state, action)),
    fb_context: {
      authStatusReported: false,
      isUserSignedIn: false,
      currentUser: null
    },
    props: this.props
  };


  componentDidMount() {
    Firebase.auth.onAuthStateChanged(user => this.setState({
      fb_context: {
        authStatusReported: true,
        isUserSignedIn: !!user,
        currentUser: user
      }
    }));
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${
        process.env.REACT_APP_MM_KEY
        }`
      )
      .then(res => {
        // console.log(res.data);
        this.setState({ track_list: res.data.message.body.track_list });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;

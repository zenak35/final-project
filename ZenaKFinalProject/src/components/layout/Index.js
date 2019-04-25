import React, { Component } from "react";
import Tracks from "../tracks/Tracks";
import Search from "../tracks/Search";
import Landing from "./Landing";
import Login from "../accounts/Login";
import firebase, {
  auth,
  provider
} from "/Users/zenakipkenda/Documents/Documents/CIS197/lyricfinder/src/firebase.js";

class Index extends Component {
  state = { currentUser: null };
  checkUserNull = () => {
    if (this.state.currentUser) {
      return <Search />, <Tracks />;
    } else {
      return <Landing />;
    }
  };
  componentDidMount() {
    const { currentUser } = auth;
    this.setState({ currentUser });
  }
  render() {
    const { currentUser } = this.state;
    return <React.Fragment>{this.checkUserNull()}</React.Fragment>;
  }
}

export default Index;

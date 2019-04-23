import React, { Component } from "react";
import Login from "../accounts/Login";
import Index from "./Index";
import firebase, {
  auth,
  provider
} from "/Users/zenakipkenda/Documents/Documents/CIS197/lyricfinder/src/firebase.js";

class Landing extends Component {
  state = {
    user: null
  };
  ifUserNull = () => {
    if (this.state.user) {
      return <Index />;
    } else {
      return <Login />;
    }
  };
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      this.setState({ user: user });
    });
  }
  render() {
    return (
      <div>
        <p>Welcome to the app you share with friends!</p>
        {/* {console.log(this.state.user)} */}
        {this.ifUserNull()}
      </div>
    );
  }
}

export default Landing;

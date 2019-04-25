import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Index from "./components/layout/Index";
import Lyrics from "./components/tracks/Lyrics";
import Tracks from "./components/tracks/Tracks";
import Search from "./components/tracks/Search";
// import Landing from "./Landing";
import Login from "./components/accounts/Login";
import SignUp from "./components/accounts/SignUp"

import "./App.css";


import { Provider } from "./context";
// import SignUp from "./components/accounts/SignUp";
// import Login from "./components/accounts/Login";

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <React.Fragment>
            <Navbar />
            <div className="container">
              <Switch>
                {/* <Route exact path="/signup" component={SignUp} />
                <Route exact path="/login" component={Login} /> */}
                <Route exact path="/lyrics/track/:id" component={Lyrics} />
                <Route exact path="/dashboard" component={Index} />
                <Route exact path="/dashboard/newuser" component={() => <Index newuser={true} />} />
                <Route exact path="/login" component={() => <Login />} />
                <Route exact path="/signup" component={() => <SignUp />} />
                <Route exact path="/" component={() =>
                  <div className="">
                    <h1 className="content">Welcome to Playlists for Friends!</h1>
                    <h5 className="content">Sign Up or Log In to get started </h5>
                  </div>
                } />
                <Route exact path="/signedOut" component={() =>
                  <h1 className="content">You're now signed out.</h1>} />
              </Switch>
            </div>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;

import React, { Component } from "react";
import Tracks from "../tracks/Tracks";
import Search from "../tracks/Search";
// import Landing from "./Landing";
import Login from "../accounts/Login";
import SignUp from "../accounts/SignUp";
import { Consumer } from '../../context';
import { withRouter } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Navbar from "./Navbar";
import Firebase from '../../Firebase'
const db = Firebase.database;
const usersTable = db.ref('users')

class Index extends Component {
  state = { currentUser: null };
  newUser = this.props.newuser
  checkNewUser = (user) => {
    if (this.props.newuser) {
      const newUser = usersTable.push()
      newUser.set({
        auth_id: Firebase.auth.currentUser.uid,
        playlists: []
      })
    }
  }

  render() {
    return (
      <Consumer>
        {value => {
          const { fb_context } = value
          if (fb_context.isUserSignedIn) {
            if (this.newUser) {
              this.checkNewUser(fb_context.currentUser)
              //this.newUser = null
              //this.props.history.push("/dashboard");
            }
            return (<React.Fragment>
              <Search />
              <Tracks />
            </React.Fragment>)
          }
          else {
            return (<React.Fragment>
              <Navbar />
            </React.Fragment>)
          }
        }
        }
      </Consumer>
    )
  }
}

export default withRouter(Index);

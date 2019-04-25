import React from 'react';
import {
  Link,
  withRouter
} from 'react-router-dom';
import { Consumer } from '../../context';
import Firebase from '../../Firebase';

const Navbar = props => {
  const handleLogout = () => {
    Firebase.auth.signOut()
      .then(function () {
        // Sign-out successful.
        props.history.push('/signedOut');
      })
      .catch(function (error) {
        // An error happened
        console.log(error)
      });
  };
  return (
    <Consumer>
      {value => {
        const { fb_context } = value
        if (fb_context.isUserSignedIn) {
          return <React.Fragment>
            <nav className="navbar navbar-dark bg-dark mb-5">
              <span className="navbar-brand mb-0 h1 mx-auto">Playlists For Friends</span>
              <Link to="/dashboard">Dashboard</Link>
              <a onClick={() => handleLogout()}>Logout</a>
            </nav>

          </React.Fragment>
        }
        else {
          return <React.Fragment>
            <nav className="navbar navbar-dark bg-dark mb-5">
              <span className="navbar-brand mb-0 h1 mx-auto">Playlists For Friends</span>
              <Link to="/">Home</Link> |
              <Link to="/login">Login</Link> |
              <Link to="/signup">Create Account</Link>
            </nav>
          </React.Fragment>
        }
      }}
    </Consumer>
  );
};

export default Navbar;

import React, { Component } from "react";
import SignUp from "./SignUp";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import firebase, {
  auth,
  provider
} from "/Users/zenakipkenda/Documents/Documents/CIS197/lyricfinder/src/firebase.js";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: null
  };
  handleLogin = () => {
    // TODO: Firebase stuff...
    console.log("handleSignUp");
  };
  render() {
    return (
      <div className="signin-form">
        <p>Log In</p>
        {this.state.errorMessage && (
          <p style={{ color: "red" }}>{this.state.errorMessage}</p>
        )}
        <form onSubmit={this.handleLogin.bind(this)}>
          <div className="form-group">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Email"
              name="userEmail"
              value={this.state.email}
              onChange={email => this.setState({ email })}
            />
            <input
              type="passward"
              className="form-control form-control-lg"
              placeholder="Password"
              name="userPassword"
              value={this.state.password}
              onChange={password => this.setState({ password })}
            />
          </div>
          <button
            className="btn btn-primary btn-lg btn-block mb-5"
            type="submit"
          >
            Login
          </button>
        </form>
        <Route
          render={({ history }) => (
            <button
              type="button"
              onClick={() => {
                history.push("/signup");
              }}
            >
              Don't have an account? Register here.
            </button>
          )}
        />
      </div>
    );
  }
}
export default Login;

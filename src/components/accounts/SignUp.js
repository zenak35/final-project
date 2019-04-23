import React, { Component } from "react";
import Login from "./Login";
import Index from "/Users/zenakipkenda/Documents/Documents/CIS197/lyricfinder/src/components/layout/Index.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import firebase, {
  auth,
  provider
} from "/Users/zenakipkenda/Documents/Documents/CIS197/lyricfinder/src/firebase.js";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: null
  };
  handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.history.push("/"))
      .catch(error => this.setState({ errorMessage: error.message }));
  };
  render() {
    return (
      <div className="signin-form">
        <p>Sign Up</p>
        {this.state.errorMessage && (
          <p style={{ color: "red" }}>{this.state.errorMessage}</p>
        )}
        <form onSubmit={this.handleSignUp.bind(this)}>
          <div className="form-group">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Email"
              name="userEmail"
              onChange={email => this.setState({ email })}
            />
            <input
              type="passward"
              className="form-control form-control-lg"
              placeholder="Password"
              name="userPassword"
              onChange={password => this.setState({ password })}
            />
          </div>
          <button
            className="btn btn-primary btn-lg btn-block mb-5"
            type="submit"
          >
            Finish Signing Up
          </button>
        </form>
        <Route
          render={({ history }) => (
            <button
              type="button"
              onClick={() => {
                history.push("/login");
              }}
            >
              Login here if you already have an account
            </button>
          )}
        />
      </div>
    );
  }
}
export default SignUp;

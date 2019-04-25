import React from 'react';
import { withRouter } from 'react-router-dom';
import Form from '../layout/Form';
import Firebase from '../../Firebase';
import { Consumer } from '../../context';


const Login = props => <Consumer>
  {value => (
    <React.Fragment>
      <Form
        action="signIn"
        title="Login"
        onSuccess={() => { props.history.push('/dashboard') }}
      // onError={({ message }) => context.setMessage(`Error occured: ${message}`)}
      />
      <button
        type="button"
        onClick={() => {
          props.history.push("/signup");
        }}
      >
        Don't have an account? Register here.
            </button>
    </React.Fragment>
  )}
</Consumer>;

export default withRouter(Login);

import React from 'react';
import { withRouter } from 'react-router-dom';
import Form from '../layout/Form';
import { Consumer } from '../../context';


const Signup = props =>
  <Consumer>
    {value => (
      <React.Fragment>
        <Form
          action="createUser"
          title="Create account"
          onSuccess={() => {
            props.history.push('/dashboard/newuser')
          }}
        // onError={({ message }) => context.setMessage(`Error occured: ${message}`)}
        />
        <button
          type="button"
          onClick={() => {
            props.history.push("/login");
          }}
        >
          Login here if you already have an account!
            </button>
      </React.Fragment>
    )}
  </Consumer>;

export default withRouter(Signup);

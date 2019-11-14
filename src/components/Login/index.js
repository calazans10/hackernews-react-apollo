import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { AUTH_TOKEN } from '../../constants';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

function Login({ history }) {
  const [values, setValues] = useState({ email: '', password: '', name: '' });
  const [login, setLogin] = useState(true);

  const { email, password, name } = values;

  const onChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onConfirm = async data => {
    const { token } = login ? data.login : data.signup;
    localStorage.setItem(AUTH_TOKEN, token);
    history.push(`/`);
  };

  return (
    <div>
      <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
      <div className="flex flex-column">
        {!login && (
          <input name="name" type="text" placeholder="Your name" value={name} onChange={onChange} />
        )}
        <input
          name="email"
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Choose a safe password"
          value={password}
          onChange={onChange}
        />
      </div>
      <div className="flex mt3">
        <Mutation
          mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
          variables={{ email, password, name }}
          onCompleted={data => onConfirm(data)}
        >
          {mutation => (
            <button type="button" className="pointer mr2 button" onClick={mutation}>
              {login ? 'login' : 'create account'}
            </button>
          )}
        </Mutation>
        <button type="button" className="pointer button" onClick={() => setLogin(!login)}>
          {login ? 'need to create an account?' : 'already have an account'}
        </button>
      </div>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Login);

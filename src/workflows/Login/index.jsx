import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { userLoginRequisition } from '../../operations/User/commands';
import { selectError, selectToken } from './selectors';

import './index.css';

const rules = {
  username: /\S+/,
  password: /\S+/
};

const errors = {
  username: 'invalid username',
  password: 'invalid password'
}

const hasError = value => type => !rules[type].test(value);
const validate = value => type => hasError(value)(type) ? errors[type] : '';

function LoginPage({ authenticate, error }) {
  const [validUsername, setValidUsername] = useState();
  const [validPassword, setValidPassword] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleUsernameInputChange = (value) => {
    const error = validate(value)('username');

    if (error) {
      setValidUsername(false);
    } else {
      setValidUsername(true);
    }

    setUsername(value);
  };

  const handlePasswordInputChange = (value) => {
    const error = validate(value)('password');

    if (error) {
      setValidPassword(false);
    } else {
      setValidPassword(true);
    }

    setPassword(value);
  };

  return (
    <div className="main-content">
      <div className="heading text-center">
        <div className="heading-container">
          <div className="product-section">
            <h1 className="title dds-display-text-1">HelloSally</h1>
            <small className="subtitle">0.1.0</small>
          </div>
          <div className="branding-section">
            <footer className="footer text-center">
              <small>© 2008-2021 Dell Inc. or its subsidiaries. All rights reserved.</small>
            </footer>
          </div>
        </div>
      </div>
      { error ? <dds-alert type="inline" status="danger" closable="false"><div slot="dds-alert-title">The username or password you entered is incorrect. Please try again.</div></dds-alert> : '' }
      <div className="login-section">
        <form>
          <label>
            <input type="text" className={ validUsername === false ? 'error' : ''} placeholder="Username" onChange={({ target }) => handleUsernameInputChange(target.value)} required />
            { validUsername === false ? <div className="input-error">{ errors.username }</div> : '' }
          </label>
          <label>
            <input type="password" className={ validPassword === false ? 'error' : ''} placeholder="Password" onChange={({ target }) => handlePasswordInputChange(target.value)} required />
            { validPassword === false ? <div className="input-error">{ errors.password }</div> : '' }
          </label>
          <div className="submit-section">
            <dds-button type="primary" size="large" onClick={() => authenticate({ username, password })} disabled={!validUsername || !validPassword}>Log In</dds-button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function mapStateToProps(state) {
  return {
    token: selectToken(state),
    error: selectError(state)
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    authenticate: credentials => {
      dispatch(userLoginRequisition(credentials));
    }
  };
}

LoginPage.propTypes = {
  authenticate: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

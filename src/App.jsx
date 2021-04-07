import React, { lazy, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import { userLogoutRequisition, userTokenRequisition } from './operations/User/commands';

import NavBar from './layouts/NavBar';

const Login = lazy(() => import('./workflows/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Catalog = lazy(() => import('./pages/Catalog'));

function App({ token, getToken, logoutUser }) {
  useEffect(() => {
    if (token || token === null) return;
    getToken();
  });

  return (
    !token ?
    <Login /> :
    <div className="App">
      <dds-masthead>
        <div slot="logo"><dds-icon name="logo_dell_halo" width="30px" height="30px"></dds-icon></div>
        <div slot="title">HelloSally</div>
        <dds-button type="primary" size="fluid" onClick={logoutUser} slot="action">
            <dds-icon name="log_out"></dds-icon>
        </dds-button>
      </dds-masthead>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path ="/" component={Dashboard} />
          <Route exact path ="/catalog" component={Catalog} />
        </Switch>
      </Router>
    </div>
  );
}

export function mapStateToProps(state) {
  // FIX
  return {
    token: state.auth.token || state.loginPage.token
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    getToken: () => {
      dispatch(userTokenRequisition());
    },
    logoutUser: () => {
      dispatch(userLogoutRequisition());
    }
  };
}

App.propTypes = {
  getToken: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

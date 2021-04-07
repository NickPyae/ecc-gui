import { combineReducers } from 'redux';
import loginReducer from './workflows/Login/reducer';
import dashboardReducer from './pages/Dashboard/reducer';
import catalogReducer from './pages/Catalog/reducer';
import displayModalReducer from './workflows/Display/reducer';
import deployModalReducer from './workflows/Deploy/reducer';

import { USER_LOGOUT_REQUISITION, USER_TOKEN_REQUISITION } from './operations/User/constants';

const initialState = {
  open: false,
  error: ''
}

function logoutReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGOUT_REQUISITION:
      return {
        ...state,
        loading: true
      };
    case USER_LOGOUT_REQUISITION.SUCCESS:
      return {
        ...state,
        loading: false
      };
    case USER_LOGOUT_REQUISITION.FAILURE:
      return {
        ...state,
        error: action.error
      };
    default: {
      return state;
    }
  }
}

function tokenReducer(state = initialState, action) {
  switch (action.type) {
    case USER_TOKEN_REQUISITION:
      return {
        ...state,
        loading: true
      };
    case USER_TOKEN_REQUISITION.SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        loading: false
      };
    case USER_TOKEN_REQUISITION.FAILURE:
      return {
        ...state,
        error: action.error
      };
    default: {
      return state;
    }
  }
}

export default combineReducers({
  logout: logoutReducer,
  auth: tokenReducer,
  loginPage: loginReducer,
  dashboardPage: dashboardReducer,
  catalogPage: catalogReducer,
  displayDialog: displayModalReducer,
  deploymentDialog: deployModalReducer
});

import { createAction } from 'redux-actions';

import {
  USER_LOGIN_REQUISITION,
  USER_LOGOUT_REQUISITION,
  USER_TOKEN_REQUISITION
} from './constants';

// LOGIN
export const userLoginRequisition = createAction(USER_LOGIN_REQUISITION.ACTION, credentials => ({ credentials }));
export const userLoginRequisitionSuccess = createAction(USER_LOGIN_REQUISITION.SUCCESS, token => ({ token }));
export const userLoginRequisitionFailure = createAction(USER_LOGIN_REQUISITION.FAILURE);

// LOGOUT
export const userLogoutRequisition = createAction(USER_LOGOUT_REQUISITION.ACTION);
export const userLogoutRequisitionSuccess = createAction(USER_LOGOUT_REQUISITION.SUCCESS);
export const userLogoutRequisitionFailure = createAction(USER_LOGOUT_REQUISITION.FAILURE);

// TOKEN
export const userTokenRequisition = createAction(USER_TOKEN_REQUISITION.ACTION);
export const userTokenRequisitionSuccess = createAction(USER_TOKEN_REQUISITION.SUCCESS, token => ({ token }));
export const userTokenRequisitionFailure = createAction(USER_TOKEN_REQUISITION.FAILURE);

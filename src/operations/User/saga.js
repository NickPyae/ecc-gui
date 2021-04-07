import { takeLatest, call, put } from 'redux-saga/effects';

import {
  USER_LOGIN_REQUISITION,
  USER_LOGOUT_REQUISITION,
  USER_TOKEN_REQUISITION
} from './constants';

import {
  userLoginRequisitionSuccess,
  userLoginRequisitionFailure,
  userLogoutRequisitionSuccess,
  userLogoutRequisitionFailure,
  userTokenRequisitionSuccess,
  userTokenRequisitionFailure
} from './commands';

import { loginUser, logoutUser, setToken, getToken } from './services';

// LOGIN
export function* userLoginSaga() {
  yield takeLatest(USER_LOGIN_REQUISITION.ACTION, handleUserLoginRequest);
}

export function* handleUserLoginRequest({ payload }) {
  try {
    const { credentials } = payload;
    const token = yield call(loginUser, credentials);
    yield call(setToken, token);
    yield put(userLoginRequisitionSuccess(token));
  } catch (error) {
    yield put(userLoginRequisitionFailure(error));
  }
}

// LOGOUT
export function* userLogoutSaga() {
  yield takeLatest(USER_LOGOUT_REQUISITION.ACTION, handleUserLogoutRequest);
}

export function* handleUserLogoutRequest() {
  try {
    yield call(logoutUser);
    yield put(userLogoutRequisitionSuccess());
  } catch (error) {
    yield put(userLogoutRequisitionFailure(error));
  }
}

// TOKEN
export function* userTokenSaga() {
  yield takeLatest(USER_TOKEN_REQUISITION.ACTION, handleUserTokenRequest);
}

export function* handleUserTokenRequest() {
  try {
    const token = yield call(getToken);
    yield put(userTokenRequisitionSuccess(token));
  } catch (error) {
    yield put(userTokenRequisitionFailure(error));
  }
}

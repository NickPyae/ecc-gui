import { takeLatest, call, put } from 'redux-saga/effects';

import { APP_DEPLOYMENT_REQUISITION, APP_LIST_REQUISITION } from './constants';

import {
  appDeploymentRequisitionSuccess,
  appDeploymentRequisitionFailure,
  appListRequisitionSuccess,
  appListRequisitionFailure,
} from './commands';

import { deployApplication, getApplicationList } from './services';

export function* appDeploymentSaga() {
  yield takeLatest(APP_DEPLOYMENT_REQUISITION.ACTION, handleAppDeploymentRequest);
}

export function* handleAppDeploymentRequest({ payload }) {
  try {
    const { artifact } = payload;
    yield call(deployApplication, artifact);
    yield put(appDeploymentRequisitionSuccess());
  } catch (error) {
    yield put(appDeploymentRequisitionFailure(error));
  }
}

export function* appListSaga() {
  yield takeLatest(APP_LIST_REQUISITION.ACTION, handleAppListRequest);
}

export function* handleAppListRequest() {
  try {
    const apps = yield call(getApplicationList);
    yield put(appListRequisitionSuccess(apps));
  } catch (error) {
    yield put(appListRequisitionFailure(error));
  }
}

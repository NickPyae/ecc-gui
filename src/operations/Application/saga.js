import { takeLatest, call, put, take } from 'redux-saga/effects';

import { APP_DEPLOYMENT_REQUISITION, APP_LIST_REQUISITION, APP_UNINSTALL_REQUISITION } from './constants';

import {
  appDeploymentRequisitionSuccess,
  appDeploymentRequisitionFailure,
  appListRequisitionSuccess,
  appListRequisitionFailure,
  appUninstallRequisitionSuccess,
  appUninstallRequisitionFailure,
} from './commands';

import { deployApplication, getApplicationList, uninstall } from './services';

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

export function* appUninstallSaga() {
  yield takeLatest(APP_UNINSTALL_REQUISITION.ACTION, handleAppUninstallRequest);
}

export function* handleAppUninstallRequest({ payload }) {
  try {
    const { app } = payload;
    yield call(uninstall, app);
    yield put(appUninstallRequisitionSuccess(app));
  } catch (error) {
    yield put(appUninstallRequisitionFailure(error));
  }
}

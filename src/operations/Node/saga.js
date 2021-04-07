import { takeLatest, call, put } from 'redux-saga/effects';

import { NODE_DETAILS_REQUISITION, NODE_LIST_REQUISITION } from './constants';

import {
  nodeDetailsRequisitionSuccess,
  nodeDetailsRequisitionFailure,
  nodeListRequisitionSuccess,
  nodeListRequisitionFailure
} from './commands';

import { getNodeDetails, getAllNodes } from './services';

export function* nodeDetailsSaga() {
  yield takeLatest(NODE_DETAILS_REQUISITION.ACTION, handleNodeDetailsRequest);
}

export function* handleNodeDetailsRequest() {
  try {
    const nodeDetails = yield call(getNodeDetails);
    yield put(nodeDetailsRequisitionSuccess(nodeDetails));
  } catch (error) {
    yield put(nodeDetailsRequisitionFailure(error));
  }
}

export function* nodeListSaga() {
  yield takeLatest(NODE_LIST_REQUISITION.ACTION, handleNodeListRequest);
}

export function* handleNodeListRequest() {
  try {
    const nodes = yield call(getAllNodes);
    yield put(nodeListRequisitionSuccess(nodes));
  } catch (error) {
    yield put(nodeListRequisitionFailure(error));
  }
}

import { all } from 'redux-saga/effects';
import { userLoginSaga, userTokenSaga, userLogoutSaga } from './operations/User/saga';
import { nodeDetailsSaga, nodeListSaga } from './operations/Node/saga';
import { appListSaga } from './operations/Application/saga';
import { appDeploymentSaga } from './operations/Application/saga';

export default function* indexSaga() {
  yield all([
    userTokenSaga(),
    userLoginSaga(),
    userLogoutSaga(),
    nodeDetailsSaga(),
    nodeListSaga(),
    appListSaga(),
    appDeploymentSaga()
  ]);
}

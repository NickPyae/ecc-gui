import { all } from 'redux-saga/effects';
import { userLoginSaga, userTokenSaga, userLogoutSaga } from './operations/User/saga';
import { nodeDetailsSaga, nodeListSaga } from './operations/Node/saga';
import {
  appListSaga,
  appDeploymentSaga,
  appUninstallSaga
} from './operations/Application/saga';

export default function* indexSaga() {
  yield all([
    userTokenSaga(),
    userLoginSaga(),
    userLogoutSaga(),
    nodeDetailsSaga(),
    nodeListSaga(),
    appListSaga(),
    appUninstallSaga(),
    appDeploymentSaga()
  ]);
}

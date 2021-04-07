import { createAction } from 'redux-actions';

import { APP_LIST_REQUISITION, APP_DEPLOYMENT_REQUISITION } from './constants';

export const appListRequisition = createAction(APP_LIST_REQUISITION.ACTION);
export const appListRequisitionSuccess = createAction(APP_LIST_REQUISITION.SUCCESS, apps => ({ apps }));
export const appListRequisitionFailure = createAction(APP_LIST_REQUISITION.FAILURE);

export const appDeploymentRequisition = createAction(APP_DEPLOYMENT_REQUISITION.ACTION, artifact => ({ artifact }));
export const appDeploymentRequisitionSuccess = createAction(APP_DEPLOYMENT_REQUISITION.SUCCESS);
export const appDeploymentRequisitionFailure = createAction(APP_DEPLOYMENT_REQUISITION.FAILURE);

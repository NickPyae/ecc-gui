import { createAction } from 'redux-actions';

import { DEPLOY_MODAL_REQUISITION } from './constants';

export const deployModalRequisition = createAction(DEPLOY_MODAL_REQUISITION);
export const deployModalRequisitionShow = createAction(DEPLOY_MODAL_REQUISITION.SHOW, app => ({ app }));
export const deployModalRequisitionHide = createAction(DEPLOY_MODAL_REQUISITION.HIDE);

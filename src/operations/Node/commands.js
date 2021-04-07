import { createAction } from 'redux-actions';

import { NODE_DETAILS_REQUISITION, NODE_LIST_REQUISITION } from './constants';

export const nodeDetailsRequisition = createAction(NODE_DETAILS_REQUISITION.ACTION);
export const nodeDetailsRequisitionSuccess = createAction(NODE_DETAILS_REQUISITION.SUCCESS, nodeDetails => ({ nodeDetails }));
export const nodeDetailsRequisitionFailure = createAction(NODE_DETAILS_REQUISITION.FAILURE);

export const nodeListRequisition = createAction(NODE_LIST_REQUISITION.ACTION);
export const nodeListRequisitionSuccess = createAction(NODE_LIST_REQUISITION.SUCCESS, nodes => ({ nodes }));
export const nodeListRequisitionFailure = createAction(NODE_LIST_REQUISITION.FAILURE);

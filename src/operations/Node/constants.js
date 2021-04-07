import { defineAction } from 'redux-define';

export const namespace = 'node';

export const NODE_DETAILS_REQUISITION = defineAction(
  'NODE_DETAILS_REQUISITION',
  ['SUCCESS', 'FAILURE'],
  namespace
);

export const NODE_LIST_REQUISITION = defineAction(
  'NODE_LIST_REQUISITION',
  ['SUCCESS', 'FAILURE'],
  namespace
);

import { defineAction } from 'redux-define';

export const namespace = 'application';

export const APP_LIST_REQUISITION = defineAction(
  'APP_LIST_REQUISITION',
  ['SUCCESS', 'FAILURE'],
  namespace
);

export const APP_DEPLOYMENT_REQUISITION = defineAction(
  'APP_DEPLOYMENT_REQUISITION',
  ['SUCCESS', 'FAILURE'],
  namespace
);

export const APP_UNINSTALL_REQUISITION = defineAction(
  'APP_UNINSTALL_REQUISITION',
  ['SUCCESS', 'FAILURE'],
  namespace
);

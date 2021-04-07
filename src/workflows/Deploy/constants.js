import { defineAction } from 'redux-define';

export const namespace = 'deploy-modal';

export const DEPLOY_MODAL_REQUISITION = defineAction(
  'DEPLOY_MODAL_REQUISITION',
  ['SHOW', 'HIDE'],
  namespace
);

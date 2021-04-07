import { defineAction } from 'redux-define';

export const namespace = 'display-modal';

export const DISPLAY_MODAL_REQUISITION = defineAction(
  'DISPLAY_MODAL_REQUISITION',
  ['SHOW', 'HIDE'],
  namespace
);

import { createAction } from 'redux-actions';

import { DISPLAY_MODAL_REQUISITION } from './constants';

export const displayModalRequisition = createAction(DISPLAY_MODAL_REQUISITION);
export const displayModalRequisitionShow = createAction(DISPLAY_MODAL_REQUISITION.SHOW, app => ({ app }));
export const displayModalRequisitionHide = createAction(DISPLAY_MODAL_REQUISITION.HIDE);

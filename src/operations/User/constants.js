import { defineAction } from 'redux-define';

export const namespace = 'user';

export const USER_LOGIN_REQUISITION = defineAction(
  'USER_LOGIN_REQUISITION',
  ['SUCCESS', 'FAILURE'],
  namespace
);

export const USER_LOGOUT_REQUISITION = defineAction(
  'USER_LOGOUT_REQUISITION',
  ['SUCCESS', 'FAILURE'],
  namespace
);

export const USER_TOKEN_REQUISITION = defineAction(
  'USER_TOKEN_REQUISITION',
  ['SUCCESS', 'FAILURE'],
  namespace
);

import { USER_LOGIN_REQUISITION } from '../../operations/User/constants';

const initialState = {
  open: false,
  error: ''
}

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN_REQUISITION:
      return {
        ...state,
        loading: true
      };
    case USER_LOGIN_REQUISITION.SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        loading: false
      };
    case USER_LOGIN_REQUISITION.FAILURE:
      return {
        ...state,
        error: action.error
      };
    default: {
      return state;
    }
  }
}

import { APP_LIST_REQUISITION } from '../../operations/Application/constants';

const initialState = {
  open: false,
  error: ''
}

export default function catalogReducer(state = initialState, action) {
  switch (action.type) {
    case APP_LIST_REQUISITION:
      return {
        ...state,
        loading: true
      };
    case APP_LIST_REQUISITION.SUCCESS:
      return {
        ...state,
        apps: action.payload.apps,
        loading: false
      };
    case APP_LIST_REQUISITION.FAILURE:
      return {
        ...state,
        error: action.error
      };
    default: {
      return state;
    }
  }
}

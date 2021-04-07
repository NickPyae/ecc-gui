import { DISPLAY_MODAL_REQUISITION } from './constants';

const initialState = {
  open: false,
  error: ''
}

export default function displayModalReducer(state = initialState, action) {
  switch(action.type) {
    case DISPLAY_MODAL_REQUISITION:
      return {
        ...state,
        loading: true
      };
    case DISPLAY_MODAL_REQUISITION.SHOW:
      return {
        ...state,
        show: true,
        app: action.payload.app,
        loading: false
      };
    case DISPLAY_MODAL_REQUISITION.HIDE:
      return {
        ...state,
        show: false,
        loading: false
      };
    default: {
      return state;
    }
  }
}

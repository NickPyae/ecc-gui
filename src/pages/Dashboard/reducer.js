import { NODE_DETAILS_REQUISITION } from '../../operations/Node/constants';

const initialState = {
  open: false,
  error: ''
}

export default function dashboardReducer(state = initialState, action) {
  switch(action.type) {
    case NODE_DETAILS_REQUISITION:
      return {
        ...state,
        loading: true
      };
    case NODE_DETAILS_REQUISITION.SUCCESS:
      return {
        ...state,
        nodeDetails: action.payload.nodeDetails,
        loading: false
      };
    case NODE_DETAILS_REQUISITION.FAILURE:
      return {
        ...state,
        error: action.error
      };
    default: {
      return state;
    }
  }
}

import { NODE_LIST_REQUISITION } from '../../operations/Node/constants';
import { APP_LIST_REQUISITION, APP_UNINSTALL_REQUISITION } from '../../operations/Application/constants';

const initialState = {
  open: false,
  error: ''
}

export default function catalogReducer(state = initialState, action) {
  switch (action.type) {
    case NODE_LIST_REQUISITION.ACTION:
      return {
        ...state,
        loading: true
      };
    case NODE_LIST_REQUISITION.SUCCESS:
      return {
        ...state,
        installedApps: action.payload.nodes,
        loading: false
      };
    case NODE_LIST_REQUISITION.FAILURE:
      return {
        ...state,
        error: action.error
      };
    case APP_LIST_REQUISITION.ACTION:
      return {
        ...state,
        loading: true
      };
    case APP_LIST_REQUISITION.SUCCESS:
      return {
        ...state,
        availableApps: action.payload.apps,
        loading: false
      };
    case APP_LIST_REQUISITION.FAILURE:
      return {
        ...state,
        error: action.error
      };
    case APP_UNINSTALL_REQUISITION.ACTION:
      return {
        ...state,
        pending: true
      };
    case APP_UNINSTALL_REQUISITION.SUCCESS:
      return {
        ...state,
        installedApps: state.installedApps.filter(app => app.name !== action.payload.app.name),
        pending: false
      };
    case APP_UNINSTALL_REQUISITION.FAILURE:
      return {
        ...state,
        error: action.error
      };
    default: {
      return state;
    }
  }
}

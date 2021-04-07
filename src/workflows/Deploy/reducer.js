import { DEPLOY_MODAL_REQUISITION } from './constants';
import { NODE_LIST_REQUISITION } from '../../operations/Node/constants';
import { APP_DEPLOYMENT_REQUISITION } from '../../operations/Application/constants';

const initialState = {
  open: false,
  error: ''
};

export default function deployModalReducer(state = initialState, action) {
  switch(action.type) {
    case DEPLOY_MODAL_REQUISITION:
      return {
        ...state,
        loading: true
      };
    case DEPLOY_MODAL_REQUISITION.SHOW:
      return {
        ...state,
        show: true,
        app: action.payload.app,
        loading: false
      };
    case DEPLOY_MODAL_REQUISITION.HIDE:
      return {
        ...state,
        show: false,
        loading: false
      };
    case NODE_LIST_REQUISITION:
      return {
        ...state,
        loading: true
      };
    case NODE_LIST_REQUISITION.SUCCESS:
      return {
        ...state,
        nodes: action.payload.nodes,
        loading: false
      };
    case NODE_LIST_REQUISITION.FAILURE:
      return {
        ...state,
        error: action.error
      };
    case APP_DEPLOYMENT_REQUISITION:
      return {
        ...state,
        loading: true
      };
    case APP_DEPLOYMENT_REQUISITION.SUCCESS:
      return {
        ...state,
        loading: false
      };
    case APP_DEPLOYMENT_REQUISITION.FAILURE:
      return {
        ...state,
        error: action.error
      };
    default: {
      return state;
    }
  }
}

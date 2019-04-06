// import { } from '../../actions/fetchActions';
import {
  CRUD_GET_LIST_SUCCESS,
  CRUD_CREATE_SUCCESS,
  CRUD_CREATE_LOADING,
  CRUD_CREATE_FAILURE
} from '../../actions/dataActions';
import { formatDateInObject } from '../../utils/util';

const range = ['task_flows'];


const task_flows = (state = {

}, action) => {
  const {
    type,
    payload,
    requestPayload,
    meta
  } = action;

  switch (type) {
    case CRUD_GET_LIST_SUCCESS:
      {
        if (!payload.entities) return state;
        if (meta.resource === 'task_flows') {
          const { task_flows } = payload.entities;
          if (!task_flows) return state;
          formatDateInObject(task_flows);
          const newState = {
            ...state,
            ...task_flows
          };
          return newState;
        }
        if (meta.resource === 'tasks') {
          const { tf_id } = meta;
          const { result } = payload;
          const newState = {
            ...state,
            [tf_id]: {
              ...state[tf_id],
              tasks: [...result]
            }
          };
          console.log("fetch Task结束")
          return newState;
        }
        return state;
      }

    default:
      return state;
  }
}
export default task_flows;
// import { } from '../../actions/fetchActions';
import {
  CRUD_GET_LIST_SUCCESS,
  CRUD_CREATE_SUCCESS,
  CRUD_CREATE_LOADING,
  CRUD_CREATE_FAILURE,
  CRUD_UPDATE_SUCCESS,
  CRUD_DELETE_SUCCESS
} from '../../actions/dataActions';
import { formatDateInObject } from '../../utils/util';



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
          meta.callback && setTimeout(meta.callback, 500)

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
    case CRUD_UPDATE_SUCCESS: {
      if (meta.resource === 'task_flows') {
        const { tf, tf_id } = requestPayload.data;
        const _tf = JSON.parse(tf);
        const { tf_name, tf_describe, end_time, category } = _tf;
        return {
          ...state,
          [tf_id]: {
            ...state[tf_id],
            tf_name,
            tf_describe,
            end_time,
            category
          }
        }
      } else if (meta.resource === 'categories') {
        const { tf_id, category } = requestPayload.data;
        return {
          ...state,
          [tf_id]: {
            ...state[tf_id],
            category
          }
        }
      } else return state;

    }


    default:
      return state;
  }
}
export default task_flows;
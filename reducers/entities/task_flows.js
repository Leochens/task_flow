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
        if (!range.includes(meta.resource)) return state;
        if (!payload.entities) return state;

        const { task_flows } = payload.entities;
        if (!task_flows) return state;
        formatDateInObject(task_flows);
        const newState = {
          ...state,
          ...task_flows
        };
        return newState;
      }
    case CRUD_CREATE_SUCCESS: {
      if(meta.resource === 'tasks'){
        const _state = {...state}
        const { entities:{task},result } = payload;
        const tf_id = task.tf_id;
        const prevTasks = _state[task[result].tf_id].tasks.slice();
        prevTasks.push(task.result);
        return{
            ...state,
            [tf_id]:{
              ...state[tf_id],
              tasks: prevTasks
            }
        }
    }
    return state;
    }
    default:
      return state;
  }
}
export default task_flows;
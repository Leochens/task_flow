import { combineReducers } from '../libs/redux';

import data from './resource/data';
import ids from './resource/list/ids';


const list = (state = {}, action) => {
  if (!action.meta || action.meta.resource !== 'tasks') return state;

  const taskFlowIds = ids('tasks')(state[action.meta.taskFlowId] || [], action);
  return { ...state, [action.meta.taskFlowId]: taskFlowIds }
};


export default combineReducers({
  data: data('tasks'),
  list: list,
});

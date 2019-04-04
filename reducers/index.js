import { combineReducers } from '../libs/redux';
import auth from './auth';
import entities from './entities/index';
import ids from './ids/index';
import notification from './notification'
import currentTaskMemberStatus from './currentTaskMemberStatus';
export default () => {
  return combineReducers({
    entities,
    auth,
    ids,
    notification,
    currentTaskMemberStatus
  });
};

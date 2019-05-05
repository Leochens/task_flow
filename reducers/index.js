import { combineReducers } from '../libs/redux';
import auth from './auth';
import entities from './entities/index';
import ids from './ids/index';
import notification from './notification'
import currentTaskMemberStatus from './currentTaskMemberStatus';
import pinTopList from './pinTopList';
import reviews from './reviews';
export default () => {
  const reducers = combineReducers({
    entities,
    auth,
    ids,
    notification,
    currentTaskMemberStatus,
    pinTopList,
    reviews
  });

  return reducers;
};

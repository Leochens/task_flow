import { combineReducers } from '../libs/redux';
import auth from './auth';
import entities from './entities/index';
import ids from './ids/index';
import notification from './notification'
export default () => {
  return combineReducers({
    entities,
    auth,
    ids,
    notification
  });
};

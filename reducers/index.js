import { combineReducers } from '../libs/redux';
import auth from './auth';
import entities from './entities/index';
// const resourceReducer = require('./resource/index').default;
import notification from './notification'


// e.g. reducer([{name: 'projects'}, {name: 'todos'}]),
export default () => {
  // const resourceReducers = {};
  // resources.forEach(resource => {
  //   resourceReducers[resource.name] = resourceReducer(resource.name, resource.options);
  // });

  return combineReducers({
    entities,
    auth,
    notification
  });
};

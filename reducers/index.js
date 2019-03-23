import {combineReducers} from '../libs/redux';
import auth from './auth'
// import resourceReducer from './resourceReducers/index'
const resourceReducer = require('./resource/index.js').default;
// import pages from './pages/index'
// import todos from './todos'
// import rehydrated from './rehydrated'
import notification from './notification'


// e.g. reducer([{name: 'projects'}, {name: 'todos'}]),
export default (resources) => {
  const resourceReducers = {};
  resources.forEach(resource => {
    resourceReducers[resource.name] = resourceReducer(resource.name, resource.options);
  });

  return combineReducers({
    ...resourceReducers,
    // todos,
    auth,
    // pages,
    // rehydrated,
    notification
  });
};

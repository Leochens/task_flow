import {
  createStore,
  applyMiddleware,
  compose
} from '../libs/redux';
import {
  createLogger
} from '../libs/redux-logger';
import devTools from '../libs/remote-redux-devtools';
import createSagaMiddleware, {
  effects
} from '../libs/redux-saga';
import regeneratorRuntime from '../libs/regenerator-runtime/runtime';
const sm = createSagaMiddleware();
import RootReducer from '../reducers/index';
import sagas from '../effects/index';
const logger = createLogger();

function configureStore() {
  const store = createStore(RootReducer([{
    name: "task_flows"
  }, {
    name: "users"
  }, {
    name: 'projects'
  }, {
    name: "tasks"
  }, {
    name: "profile"
  }]), compose(
    applyMiddleware(sm, logger),
  ));
  sm.run(sagas);
  return store;
}

module.exports = configureStore;
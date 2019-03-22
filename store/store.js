import { createStore,applyMiddleware,compose } from 'redux';
import { createLogger} from 'redux-logger';
import devTools from '../libs/remote-redux-devtools';
import RootReducer from '../reducers/index';
const logger = createLogger();
const store = createStore(RootReducer);
function configureStore() {
    return createStore(RootReducer, applyMiddleware(logger));
   }


module.exports =  configureStore;


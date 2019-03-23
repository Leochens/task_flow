import { effects} from '../libs/redux-saga';
import simpleRestClient from '../rest/simple';
import appConfig from '../appConfig';
import regeneratorRuntime from '../libs/regenerator-runtime/runtime';
import crudFetch from './crudFetch'
// import {watchAddTodo} from './projectTodoCount'
// import {watchFetchLoading} from './navBarLoading'
import {watchShowNotification} from './hideNotification'

import failure from './failure'

const {fork} = effects;

export default function* root() {
  yield [
    fork(crudFetch(simpleRestClient(appConfig.apiBaseUrl), ()=> [], failure)),
    // fork(watchAddTodo),
    // fork(watchFetchLoading),
    fork(watchShowNotification)
  ]
}

import {effects} from '../libs/redux-saga';
import appConfig from '../appConfig';
import regeneratorRuntime from '../libs/regenerator-runtime/runtime';

import simpleRestClient from '../rest/simple';
import { watchShowNotification } from './hideNotification'
import failure from './failure'
import {
  FETCH_START,
  FETCH_END,
  FETCH_ERROR,
  FETCH_CANCEL,
} from '../actions/fetchActions';

const { takeEvery, takeLatest, put, call, cancelled, select } = effects;
const restClient = simpleRestClient(appConfig.apiBaseUrl)
const successSideEffects = () => [];
const failureSideEffects = failure;
function* handleFetch(action) {
  const { type, payload, meta } = action;
  const restType = meta.fetch;
  delete meta.fetch;
  yield put({ type: `${type}_LOADING`, payload, meta })
  yield put({ type: FETCH_START })

  let response;
  console.log("p1")

  try {
    const auth = yield select(state => state.auth);
    console.log("3333")
    response = yield call(restClient, restType, meta.resource, payload, auth);
    yield put({
      type: `${type}_SUCCESS`,
      payload: response,
      requestPayload: payload,
      meta,
    });

    yield [...successSideEffects(type, meta.resource, payload, response)].map(a => put(a));
    yield put({ type: FETCH_END });

  } catch (error) {
    console.log("p1")

    yield put({
      type: `${type}_FAILURE`,
      error: error.message ? error.message : error,
      requestPayload: payload,
      meta,
    });
    yield [...failureSideEffects(type, meta.resource, payload, error)].map(a => put(a));
    yield put({ type: FETCH_ERROR });

  } finally {
    if (yield cancelled()) {
      yield put({ type: FETCH_CANCEL });
      return; /* eslint no-unsafe-finally:0 */
    }
  }
}


// const { fork } = effects;

export default function* root() {
  yield takeEvery(action => action.meta && action.meta.fetch && !action.meta.cancelPrevious, handleFetch);
  yield takeLatest(action => action.meta && action.meta.fetch && action.meta.cancelPrevious, handleFetch);
  // yield watchAddTodo()
  // yield watchFetchLoading();
  yield watchShowNotification();
}
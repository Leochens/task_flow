
import { effects, delay } from '../libs/redux-saga';
import appConfig from '../appConfig';
import regeneratorRuntime from '../libs/regenerator-runtime/runtime';
import { SHOW_NOTIFICATION, hideNotification } from '../actions/notificationActions'
import { replaceNULL } from '../utils/util';

import simpleRestClient from '../rest/simple';
import successSideEffects from './successSideEffects';
// import { watchShowNotification } from './hideNotification'
import failure from './failure'
import {
  FETCH_START,
  FETCH_END,
  FETCH_ERROR,
  FETCH_CANCEL,
} from '../actions/fetchActions';

const { takeEvery, takeLatest, put, call, cancelled, select } = effects;
const restClient = simpleRestClient(appConfig.apiBaseUrl)
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
    response = yield call(restClient, restType, meta.resource, payload, auth);
    // response = JSON.parse(replaceNULL(JSON.stringify(response)));

    yield put({
      type: `${type}_SUCCESS`,
      payload: meta.normalizeFunc ? meta.normalizeFunc(response) : response,
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


function* tryHideNotification() {
  yield delay(1500);
  yield put(hideNotification());
}
export default function* root() {
  yield takeEvery(action => action.meta && action.meta.fetch && !action.meta.cancelPrevious, handleFetch);
  yield takeLatest(action => action.meta && action.meta.fetch && action.meta.cancelPrevious, handleFetch);
  yield takeLatest(SHOW_NOTIFICATION, tryHideNotification);;
}
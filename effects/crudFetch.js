
import { effects } from '../libs/redux-saga';
import regeneratorRuntime from '../libs/regenerator-runtime/runtime';
import {
  FETCH_START,
  FETCH_END,
  FETCH_ERROR,
  FETCH_CANCEL,
} from '../actions/fetchActions';

const { takeEvery, takeLatest, put, call, cancelled, select } = effects;

const crudFetch = (restClient, successSideEffects = () => [], failureSideEffects = () => []) => {
  function* handleFetch(action) {
    const { type, payload, meta } = action;
    const restType = meta.fetch;
    delete meta.fetch;
    yield [
      put({ type: `${type}_LOADING`, payload, meta }),
      put({ type: FETCH_START }),
    ];
    let response;
    try {
      const auth = yield select(state => state.auth);
      response = yield call(restClient, restType, meta.resource, payload, auth);
      yield [
        put({
          type: `${type}_SUCCESS`,
          payload: response,
          requestPayload: payload,
          meta,
        }),
        ...successSideEffects(type, meta.resource, payload, response).map(a => put(a)),
        put({ type: FETCH_END }),
      ];
    } catch (error) {
      yield [
        put({
          type: `${type}_FAILURE`,
          error: error.message ? error.message : error,
          requestPayload: payload,
          meta,
        }),
        ...failureSideEffects(type, meta.resource, payload, error).map(a => put(a)),
        put({ type: FETCH_ERROR }),
      ];
    } finally {
      if (yield cancelled()) {
        yield put({ type: FETCH_CANCEL });
        return; /* eslint no-unsafe-finally:0 */
      }
    }
  }

  return function* watchCrudFetch() {
    yield [
      // 只监听最新的action
      takeLatest(action => action.meta && action.meta.fetch && action.meta.cancelPrevious, handleFetch),
      // 如果取消之前的action的字段为false说明每个action都有效 就监听每个action
      takeEvery(action => action.meta && action.meta.fetch && !action.meta.cancelPrevious, handleFetch),
    ];
  };
};


export default crudFetch;

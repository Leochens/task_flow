import {SHOW_NOTIFICATION, hideNotification} from '../actions/notificationActions'

import ReduxSaga,{effects} from '../libs/redux-saga';

import regeneratorRuntime from '../libs/regenerator-runtime/runtime';


const {delay} = ReduxSaga;
const {takeLatest, put} = effects;

function* tryHideNotification() {
  yield delay(1500);
  yield put(hideNotification());
}

export function* watchShowNotification() {
  yield takeLatest(SHOW_NOTIFICATION, tryHideNotification);
}
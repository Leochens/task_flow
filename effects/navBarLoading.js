import {FETCH_START, FETCH_END, FETCH_ERROR} from '../actions/fetchActions'
import {effects} from '../libs/redux';
import regeneratorRuntime from '../libs/regenerator-runtime/runtime';

const {takeEvery} = effects;

function* showLoading() {
  wx.showNavigationBarLoading();
}

function* hideLoading() {
  wx.hideNavigationBarLoading()
}

export function* watchFetchLoading() {
  yield [
    takeEvery(FETCH_START, showLoading),
    takeEvery(FETCH_END, hideLoading),
    takeEvery(FETCH_ERROR, hideLoading)
  ];
}
import {
  CRUD_CREATE_SUCCESS
} from '../actions/dataActions'
import {
  getExpiration
} from '../utils/util.js';
const auth = (state = {
  authenticated: false
}, action) => {
  const { type, meta, payload } = action;
  if (meta && meta.resource !== 'auth') return state;
  switch (type) {
    case CRUD_CREATE_SUCCESS:

      const { payload: {
        SID,
        u_id
      } } = action;
      if (!SID || !u_id) return state;

      wx.setStorageSync("SID", payload.SID);
      wx.setStorageSync("u_id", payload.u_id);
      wx.setStorageSync("SID_EXPIRATION", getExpiration()); // 设置过期时间
      meta.callback &&setTimeout(meta.callback,100);
      return {
        authenticated: true,
        ...payload
      };

    default:
      return state
  }
};

export default auth;
import {
  CRUD_CREATE_SUCCESS
} from '../actions/dataActions'
import {
  getExpiration
} from '../utils/util.js';
const auth = (state = {
  authenticated: false
}, action) => {
  if (action.meta && action.meta.resource !== 'auth') return state;

  switch (action.type) {
    case CRUD_CREATE_SUCCESS:
      wx.setStorageSync("SID", action.payload.SID);
      wx.setStorageSync("SID_EXPIRATION", getExpiration()); // 设置过期时间
      return {
        authenticated: true,
        ...action.payload
      };
    default:
      return state
  }
};

export default auth;
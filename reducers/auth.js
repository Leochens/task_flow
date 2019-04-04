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

      const { payload:{
        SID,
        u_id
      }} = action;
      if(!SID||!u_id) return state;
      
      wx.setStorageSync("SID", action.payload.SID);
      wx.setStorageSync("u_id", action.payload.u_id);
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
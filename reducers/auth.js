import { CRUD_CREATE_SUCCESS } from '../actions/dataActions'
import appConfig from '../appConfig';
const auth = (state = { authenticated: false }, action) => {
  if (action.meta && action.meta.resource !== 'auth') return state;

  switch (action.type) {
    case CRUD_CREATE_SUCCESS:
      wx.setStorageSync("SID",action.payload.SID);
      return { authenticated: true, ...action.payload };
    default:
      return state 
  }
};

export default auth;
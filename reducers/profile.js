import { CRUD_UPDATE_SUCCESS } from '../actions/dataActions';


const userInfo = wx.getStorageSync('userInfo') || {};
const profile = (state = userInfo, action) => {

    const { type } = action;
    return state;
}


export default profile;
import {
    SHOW_NOTIFICATION,
    HIDE_NOTIFICATION
} from '../actions/notificationActions';
import {
    CRUD_CREATE_LOADING,
    CRUD_CREATE_FAILURE,
    CRUD_CREATE_SUCCESS,
    CRUD_GET_LIST_LOADING,
    CRUD_GET_LIST_FAILURE,
    CRUD_GET_LIST_SUCCESS,
    CRUD_UPDATE_LOADING,
    CRUD_UPDATE_FAILURE,
    CRUD_UPDATE_SUCCESS,
    CRUD_DELETE_LOADING,
    CRUD_DELETE_FAILURE,
    CRUD_DELETE_SUCCESS
} from '../actions/dataActions'
const defaultState = {
    text: '',
    type: 'info', // one of 'info', 'confirm', 'warning'
};
const successFilter = (resource, payload) => {
    switch (resource) {
        case 'tasks':
        case 'task_flows': {
            wx.showToast({
                title: payload.msg || "成功"
            });
            setTimeout(
                () => wx.navigateBack(),
                1000);
            break;
        }
        default: return;
    }
}
const failureFilter = (resource, payload) => {
    switch (resource) {
        case 'tasks':
        case 'task_flows': {
            wx.showToast({
                title: payload.msg,
            });
            setTimeout(
                () => wx.navigateBack(),
                1000);
            break;
        }
        default: return;
    }
}
export default (state = defaultState, {
    type,
    payload,
    meta
}) => {
    switch (type) {
        case CRUD_CREATE_LOADING:
        case CRUD_GET_LIST_LOADING:
        case CRUD_DELETE_LOADING:
        case CRUD_UPDATE_LOADING:
            {
                wx.showLoading({
                    title: '加载中',
                })
                return state;
            }
        case CRUD_CREATE_SUCCESS:
        case CRUD_GET_LIST_SUCCESS:
        case CRUD_DELETE_SUCCESS:
        case CRUD_UPDATE_SUCCESS:
            {
                wx.hideLoading();
                successFilter(meta.resource, payload);
                return state;
            }
        case CRUD_CREATE_FAILURE:
        case CRUD_GET_LIST_FAILURE:
        case CRUD_DELETE_FAILURE:
        case CRUD_UPDATE_FAILURE: {
            wx.hideLoading();
            failureFilter(meta.resource, payload);
            return state;
        }
        default:
            return state;
    }
};
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
import { PIN_TOP_TASK_FLOW, CANCEL_PIN_TOP_TASK_FLOW } from '../actions/index';
const defaultState = {
    text: '',
    type: 'info', // one of 'info', 'confirm', 'warning'
};
const successFilter = (resource, payload) => {
    switch (resource) {
        case 'tasks': { }
        case 'task_flows': {
            if (payload.msg) {
                wx.showToast({
                    title: payload.msg
                });
            }
            setTimeout(
                () => wx.navigateBack(),
                1000);
            break;
        }
        default: return;
    }
}
const loadingFilter = (resource) => {
    switch (resource) {
        case 'tasks':
        case 'task_flows': {
            wx.showLoading({
                title: '加载中',
            })
            break;
        }
        case 'auth': {
            wx.showLoading({
                title: "登录中"
            });
            break;
        }
        default: return;
    }
}
const failureFilter = (resource, error) => {
    switch (resource) {
        case 'tasks':
        case 'task_flows': {
            wx.showToast({
                title: error || "失败",
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
    meta,
    error
}) => {
    switch (type) {
        case CRUD_CREATE_LOADING:
        case CRUD_GET_LIST_LOADING:
        case CRUD_DELETE_LOADING:
        case CRUD_UPDATE_LOADING:
            {
                loadingFilter(meta.resource);
                return state;
            }
        case CRUD_GET_LIST_SUCCESS: {
            if (meta.resource === 'tasks') {
                wx.hideLoading();
                return state;
            }
        }
        case CRUD_CREATE_SUCCESS:
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
            failureFilter(meta.resource, error);
            return state;
        }
        case PIN_TOP_TASK_FLOW: {
            wx.showToast({
                title: "置顶成功"
            });
            return state;
        }
        case CANCEL_PIN_TOP_TASK_FLOW: {
            wx.showToast({
                title: "取消置顶成功"
            });
            return state;
        }
        default:
            return state;
    }
};
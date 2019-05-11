// import { } from '../../actions/fetchActions';
import {
  CRUD_GET_LIST_SUCCESS,
  CRUD_CREATE_SUCCESS,
  CRUD_CREATE_LOADING,
  CRUD_CREATE_FAILURE,
  CRUD_UPDATE_SUCCESS,
  CRUD_DELETE_SUCCESS
} from '../../actions/dataActions';
import { formatDateInObject } from '../../utils/util';



const st_task_flows = wx.getStorageSync('task_flows') || {};
const task_flows = (state = st_task_flows, action) => {
  const {
    type,
    payload,
    requestPayload,
    meta
  } = action;

  switch (type) {
    case CRUD_GET_LIST_SUCCESS:
      {
        if (!payload.entities) return state;
        if (meta.resource === 'task_flows') {
          const { task_flows } = payload.entities;
          if (!task_flows) return state;
          formatDateInObject(task_flows);
          const newState = {
            ...state,
            ...task_flows
          };
          meta.callback && setTimeout(meta.callback, 100)
          wx.setStorageSync('st_task_flows', newState);
          return newState;
        }
        if (meta.resource === 'tasks') {
          const { tf_id } = meta;
          const { result } = payload;
          meta.callback && setTimeout(meta.callback, 100)

          const newState = {
            ...state,
            [tf_id]: {
              ...state[tf_id],
              tasks: [...result]
            }

          };
          wx.setStorageSync('st_task_flows', newState);

          console.log("fetch Task结束")
          return newState;
        }

        return state;
      }
    case CRUD_UPDATE_SUCCESS: {
      if (meta.resource === 'task_flows') {
        const { tf, tf_id } = requestPayload.data;
        const _tf = JSON.parse(tf);
        const { tf_name, tf_describe, end_time, category } = _tf;
        const newState = {
          ...state,
          [tf_id]: {
            ...state[tf_id],
            tf_name,
            tf_describe,
            end_time,
            category
          }
        }
        wx.setStorageSync('st_task_flows', newState);
        return newState;
      } else if (meta.resource === 'categories') {
        const { tf_id, category } = requestPayload.data;
        const newState = {
          ...state,
          [tf_id]: {
            ...state[tf_id],
            category
          }
        }
        wx.setStorageSync('st_task_flows', newState);
        return newState;
      }
      else if (meta.resource === 'invite') { // 更新tf的成员邀请权限
        const { tf_id, status } = requestPayload.data;

        const newState = {
          ...state,
          [tf_id]: {
            ...state[tf_id],
            invite: Number(status)
          }
        }
        return newState;
      }
      else return state;

    }


    default:
      return state;
  }
}
export default task_flows;
// import { } from '../../actions/fetchActions';
import {
  CRUD_GET_LIST_SUCCESS,
  CRUD_CREATE_SUCCESS
} from '../../actions/dataActions';

const range = ['task_flows'];
const task_flows = (state = {

}, action) => {
  const {
    type,
    payload,
    requestPayload,
    meta
  } = action;

  switch (type) {
    case CRUD_GET_LIST_SUCCESS:
      {
        if (!range.includes(meta.resource)) return state;

        const newState = {
          ...state,
          ...payload.entities.task_flows
        };
        return newState;
      }
    case CRUD_CREATE_SUCCESS:
      {
        if (meta.resource === 'task_flows') {
          wx.showToast({
            title: '插入成功',
          });
          setTimeout(
            ()=>wx.navigateBack(),
            1000
          )
        }
        return state;
      }
    default:
      return state;
  }
}
export default task_flows;
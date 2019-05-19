import get30Days from '../utils/get30Days';
import { formatTime } from '../utils/util';

import { CRUD_UPDATE_SUCCESS, CRUD_DELETE_SUCCESS, CRUD_GET_LIST_SUCCESS, CRUD_CREATE_SUCCESS } from '../actions/dataActions';
const init = () => {
    const xx = get30Days();
    const dates = get30Days().map(date => ({ date, cnt: 0, update: [], delete: [], create: [] }));

    const datesObj = {};
    dates.forEach(date => {
        datesObj[date.date] = date;
    });
    return datesObj;
}
const dayBoxInit = wx.getStorageSync('dayBox') || init(); //初始化一个空的操作格

const dayBox = (state = dayBoxInit, action) => {
    console.log(state);
    const { type, tf_id } = action;
    const today = formatTime(new Date(new Date().setDate(new Date().getDate()))).split(' ')[0];
    const cnt = state[today].cnt;
    switch (type) {
        case CRUD_CREATE_SUCCESS: {
            const newState = {
                ...state,
                [today]: {
                    ...state[today],
                    cnt: cnt + 1
                }
            }
            return newState;
        }
        case CRUD_DELETE_SUCCESS: {
            const newState = {
                ...state,
                [today]: {
                    ...state[today],
                    cnt: cnt + 1
                }
            }
            return newState;
        }
        case CRUD_UPDATE_SUCCESS: {
            const newState = {
                ...state,
                [today]: {
                    ...state[today],
                    cnt: cnt + 1
                }
            }
            return newState;
        }
        default: return state;
    }
}



export default dayBox;

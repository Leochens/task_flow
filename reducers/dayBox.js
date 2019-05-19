import getDays from '../utils/getDays';
import { formatTime } from '../utils/util';

import { RECORD_OPERATION } from '../actions/record';
const init = () => {
    const dates = getDays(30).map(date => ({ date, cnt: 0, update: [], delete: [], create: [] }));

    const datesObj = {};
    dates.forEach(date => {
        datesObj[date.date] = date;
    });
    return datesObj;
}
// 小程序刚打开的时候执行
const getDayBox = () => {
    const dayBox = wx.getStorageSync('dayBox');
    if (!dayBox) return init(); // 没有dayBox数据 说明是新用户或用户清空数据 则重新初始化 //初始化一个空的操作格
    const dayBoxKeys = Object.keys(dayBox);
    const lastDay = dayBoxKeys[dayBoxKeys.length - 1]; // 找到上次操作的最后一天

    const today = formatTime(new Date(new Date().setDate(new Date().getDate()))).split(' ')[0];
    const days = Math.ceil((today - lastDay) / (1000 * 60 * 60 * 24)); // 算出距离上次操作的最后一天差多少天
    if (!days) return dayBox; // 不差天 说明今天已经有过操作了 就直接返回

    const dates = getDays(days).map(date => ({ date, cnt: 0, update: [], delete: [], create: [] }));
    const datesObj = {};
    dates.forEach(date => {
        datesObj[date.date] = date;
    });
    const newDayBox = { // 把差的这些天再加上
        ...dayBox,
        ...datesObj
    }
    wx.setStorageSync('dayBox', newDayBox);
    return newDayBox;
}
const dayBoxInit = getDayBox(); 

/**
 * op_type: update | create | delete
 */
const dayBox = (state = dayBoxInit, action) => {
    console.log(state);
    const { type, op_type, msg } = action;
    const today = formatTime(new Date(new Date().setDate(new Date().getDate()))).split(' ')[0];
    const cnt = state[today].cnt;
    switch (type) {
        case RECORD_OPERATION: {
            const _state = { ...state };
            const list = [..._state[today][op_type]];//获得相应类型的操作记录列表
            list.unshift(msg);
            const newState = {
                ...state,
                [today]: {
                    ...state[today],
                    cnt: cnt + 1,
                    [op_type]: list.slice()
                }
            }
            wx.setStorageSync('dayBox', newState);
            return newState;
        }
        default: return state;
    }
}



export default dayBox;

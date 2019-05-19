import { PIN_TOP_TASK_FLOW, CANCEL_PIN_TOP_TASK_FLOW, GET_PIN_TOP_TASK_FLOW } from '../actions/index';
const _pinTopList = wx.getStorageSync('pin_top_list') || [];

const pinTopList = (state = _pinTopList, action) => {
    const { type, tf_id } = action;
    switch (type) {
        case GET_PIN_TOP_TASK_FLOW: { // 获得置顶的tf
            const pinTopList = wx.getStorageSync('pin_top_list');
            console.log(pinTopList);
            if (!Array.isArray(pinTopList)) wx.setStorageSync('pin_top_list', []);
            return pinTopList || [];
        }
        case PIN_TOP_TASK_FLOW: { // 置顶一条tf
            const pinTopList = [...wx.getStorageSync('pin_top_list')];
            if (!pinTopList.includes(tf_id))
                pinTopList.unshift(tf_id);
            wx.setStorageSync('pin_top_list', pinTopList);
            const _state = state.slice();
            if (!_state.includes(tf_id))
                _state.unshift(tf_id);
            return _state;
        }
        case CANCEL_PIN_TOP_TASK_FLOW: { // 取消置顶一条tf
            const pinTopList = [...wx.getStorageSync('pin_top_list')];
            pinTopList.splice(pinTopList.indexOf(tf_id), 1);
            wx.setStorageSync('pin_top_list', pinTopList);

            const _state = state.slice();
            _state.splice(_state.indexOf(tf_id), 1);
            return _state;
        }
        default: return state;
    }
}

export default pinTopList;
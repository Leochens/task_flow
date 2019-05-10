import { TOGGLE_SETTING_INTELLECT_DATETME, TOGGLE_SETTING_PIN_TOP } from '../actions/settings';
const sts = wx.getStorageSync('settings') || {
    isPinTop: true,
    intellectDatetime: false
}
const initSettings = {
    isPinTop: sts.isPinTop,
    intellectDatetime: sts.intellectDatetime
}

const settings = (state = initSettings, action) => {
    const { type } = action;
    switch (type) {
        case TOGGLE_SETTING_INTELLECT_DATETME: {
            const flag = action.flag;
            const settings = wx.getStorageSync('settings') || initSettings;
            settings.intellectDatetime = flag;
            wx.setStorageSync('settings', settings);
            return settings;

        }
        case TOGGLE_SETTING_PIN_TOP: {
            const flag = action.flag;
            const settings = wx.getStorageSync('settings') || initSettings;
            settings.isPinTop = flag;
            wx.setStorageSync('settings', settings);
            return settings;
        }
        default: return state;
    }
}


export default settings;
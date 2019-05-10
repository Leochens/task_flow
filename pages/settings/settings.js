// pages/settings/settings.js
import {
  connect
} from '../../libs/wechat-weapp-redux';
import { toggleSettingIntellectDatetime, toggleSettingPinTop } from '../../actions/settings';
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime';

const page = {

  /**
   * 页面的初始数据
   */
  data: {
    isPinTop: false,
    intellectDatetime: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  toggleIntellectDatetime: function (e) {
    const flag = e.detail.value;
    this.toggleSettingIntellectDatetime(flag);
  },
  togglePinTop: function (e) {
    const flag = e.detail.value;
    this.toggleSettingPinTop(flag);
  }
}
const mapStateToData = state => {
  const { isPinTop, intellectDatetime } = state.settings;
  return {
    isPinTop,
    intellectDatetime
  }
}
const mapDispatchToPage = dispatch => {
  return {
    toggleSettingPinTop: flag => dispatch(toggleSettingPinTop(flag)),
    toggleSettingIntellectDatetime: flag => dispatch(toggleSettingIntellectDatetime(flag))
  }
}
const _page = connect(mapStateToData, mapDispatchToPage)(page);
Page(_page);
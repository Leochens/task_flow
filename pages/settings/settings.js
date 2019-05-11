// pages/settings/settings.js
import {
  connect
} from '../../libs/wechat-weapp-redux';
import {
  toggleSettingIntellectDatetime,
  toggleSettingPinTop,
  updateNickName
} from '../../actions/settings';
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime';
import APP from '../../appConfig';
const app = getApp();
const page = {

  /**
   * 页面的初始数据
   */
  data: {
    isPinTop: false,
    intellectDatetime: false,
    nickName: wx.getStorageSync('userInfo').nickName
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow: function () {
    this.setData({
      nickName: wx.getStorageSync('userInfo').nickName
    })
  },
  changeNickName: function (e) {
    console.log(e);
    const nickName = e.detail.value.nickName;
    const u_id = app.globalData.u_id;
    // 修改nickname的api
    wx.request({
      url: APP.apiBaseUrl + '/profile/' + u_id + '/nick_name',
      method: 'PUT',
      data: JSON.stringify({
        nickName
      }),
      success: function (e) {
        console.log(e);
        const userInfo = wx.getStorageSync('userInfo');
        userInfo.nickName = nickName;
        wx.setStorageSync('userInfo', userInfo);
      },
      fail: function (err) {
        console.log(err);
      }
    })

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
  const {
    isPinTop,
    intellectDatetime
  } = state.settings;
  return {
    isPinTop,
    intellectDatetime
  }
}
const mapDispatchToPage = dispatch => {
  return {
    toggleSettingPinTop: flag => dispatch(toggleSettingPinTop(flag)),
    toggleSettingIntellectDatetime: flag => dispatch(toggleSettingIntellectDatetime(flag)),
    updateNickName: nickName => dispatch(updateNickName(nickName))
  }
}
const _page = connect(mapStateToData, mapDispatchToPage)(page);
Page(_page);
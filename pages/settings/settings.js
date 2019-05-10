// pages/settings/settings.js
const initSettings = {
  isPinTop: false,
  intellectDatetime: false
}
Page({

  /**
   * 页面的初始数据
   */
  data: initSettings,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const settings = wx.getStorageSync('settings') || initSettings;
    const { isPinTop, intellectDatetime } = settings;
    this.setData({
      isPinTop: isPinTop || false,
      intellectDatetime: intellectDatetime || false
    })
  },
  toggleIntellectDatetime: function (e) {
    const flag = e.detail.value;
    const settings = wx.getStorageSync('settings') || initSettings;
    settings.intellectDatetime = flag;
    wx.setStorageSync('settings', settings);
    this.setData({
      intellectDatetime: flag
    });
  },
  togglePinTop: function (e) {
    const flag = e.detail.value;
    const settings = wx.getStorageSync('settings') || initSettings;
    settings.isPinTop = flag;
    wx.setStorageSync('settings', settings);
    this.setData({
      isPinTop: flag
    });
  }
})
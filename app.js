//app.js
// console.log = ()=>{};
import {
  Provider
} from './libs/wechat-weapp-redux';
const configureStore = require('./store/store.js');
const store = configureStore();
App(Provider(store)({
  onLaunch: function(options) {
    console.log("opts", options);
    if(options.shareTicket){
      wx.showModal({
        title:'test',
        content:JSON.stringify(options.shareTicket)
      })
    }
    const that = this;
    wx.getSystemInfo({
      success: function(e) {
        that.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        that.globalData.Custom = custom;
        that.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },
  globalData: {
    userInfo: null,
    loading: true,
    sessionId: null,
    expiredTime: 0,
    isLogin: false,
    share: false, // 分享默认为false
    height: 0,
  }
}));
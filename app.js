//app.js
// const url = "http://api.mokis.top:8899"
wx.cloud.init();
import {
  Provider
} from './libs/wechat-weapp-redux';
const configureStore = require('./store/store.js');
const store = configureStore();
App(Provider(store)({
  onShow: function(options) {
  },

  login: function() {
    const that = this;
    // 登录
    wx.login({
      success: res => {
        // 获得code 向服务端换取openId和sessionKey存储到缓存里
        console.log(res.code)
        // wx.cloud.callFunction({
        //   name: "getSessionKey",
        //   data: {
        //     code: res.code
        //   },
        //   success: function(res) {
        //     console.log("登录成功 换取sessionKey成功", res);
        //     const data = res.result
        //     // 把 SessionId 和过期时间放在内存中的全局对象和本地缓存里边
        //     that.globalData.sessionId = data.session_key
        //     that.globalData.openId = data.openid
        //     wx.setStorageSync('SESSIONID', data.session_key);
        //     wx.setStorageSync('OPENID', data.openid);
        //     // 假设登录态保持7天
        //     const expiredTime = +new Date() + 1 * 24 * 60 * 60 * 1000 * 7;
        //     that.globalData.expiredTime = expiredTime
        //     wx.setStorageSync('EXPIREDTIME', expiredTime);
        //     that.globalData.isLogin = true

        //     console.log("写入sessionId到缓存成功");
        //   },
        //   fail: function(err) {
        //     console.log("换取失败", err);
        //   }
        // })
      }
    })
  },

  checkSeesion: function() {
    // 1.查看缓存中的sessionId是否过期,若是过期,重新登录
    const sessionId = wx.getStorageSync('SESSIONID')
    const expiredTime = wx.getStorageSync('EXPIREDTIME')
    console.log(sessionId, expiredTime);
    const now = +new Date()
    if (now - expiredTime <= 1 * 24 * 60 * 60 * 1000 * 7) {
      this.globalData.sessionId = sessionId
      this.globalData.expiredTime = expiredTime
      this.globalData.isLogin = true
    } else {
      // 如果缓存过期需要重新登录
      this.login();
    }
  },
  onLaunch: function(options) {
    console.log("opts", options);
    // 1. 检查是否存有sessionKey和openId
    // 2. 若有 检查sessionKey是否过期
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
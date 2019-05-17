// pages/invite/invite.js
import {
  connect
} from '../../libs/wechat-weapp-redux';
import {
  login
} from '../../actions/auth';
import { addNewTaskFlowMember } from '../../actions/index';

const app = getApp()
const page = {

  /**
   * 页面的初始数据
   */
  data: {
    tf_id: ''
  },
  // 检测SID是否过期 过期后要重新登录
  checkSID: function () {
    const SID = wx.getStorageSync('SID');
    const SID_EXPIRATION = wx.getStorageSync('SID_EXPIRATION')
    const now = Date.parse(new Date());
    if (SID && SID_EXPIRATION > now) { //存在SID并且没有过期
      console.log("存在SID并且没有过期", SID, now);
      return;
    } else { // 不存在SID或SID已经过期 那么需要登录
      this._login();
      this.fetchTaskFlows(this.data.u_id)
      return;
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    if (!e.detail.userInfo) {
      return;
    }
    wx.setStorageSync('userInfo', e.detail.userInfo);
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
    // 向后端发送userInfo
    this.gotUserInfo(this.data.u_id, e.detail.userInfo);
    this.setData({
      showAuthModal: false
    });
    wx.showTabBar({});
  },
  _login: function () {
    const that = this;
    wx.login({
      success: function (res) {
        console.log(res)
        that.login(res.code);
      },
      fail: function (err) {
        console.log(err);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideTabBar({
    });
    this.checkSID();

    // wx.showModal({
    //   title: 'test',
    //   content: JSON.stringify(options)
    // })
    const { tf_id, who, cnt, tf_name, avatar } = options;
    this.setData({
      tf_id,
      who,
      tf_name,
      cnt,
      avatar
    })

  },
  getUserInfoFromStorage: function () {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      console.log("get ", userInfo);
      this.setData({
        userInfo,
        hasUserInfo: true
      })
    }

  },
  confirm: function () { // 确认加入
    const u_id = wx.getStorageSync('u_id');

    if (!u_id) {
      // 登录 
      this._login();
      return;
    }

    this.addNewTaskFlowMember(this.data.tf_id, u_id);
    wx.showToast({
      title: '加入成功',
    });
    wx.switchTab({
      url: '../index/index'
    })

  },
  cancel: function () { // 取消加入 到首页看一看吧

  }
}
const mapStateToData = (state, options) => {
  return {
    u_id: wx.getStorageSync('u_id') || "no_user_id",
  };
}
const mapDispatchToPage = dispatch => ({
  login: code => dispatch(login(code)),
  addNewTaskFlowMember: (tf_id, u_id) => dispatch(addNewTaskFlowMember(tf_id, u_id))
})
const _page = connect(mapStateToData, mapDispatchToPage)(page);
Page(_page);
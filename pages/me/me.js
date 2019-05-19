// pages/me/me.js
import {
  connect
} from '../../libs/wechat-weapp-redux';
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime';


const page = {

  /**
   * 页面的初始数据
   */
  data: {
    taskFlowsCnt: 0,
    myTaskFlowsCnt: 0,
    finishedCnt: 0,
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow: function () {
    const userInfo = wx.getStorageSync('userInfo') || {};

    this.setData({
      userInfo
    })
  },
  toSettings: function () {

    wx.navigateTo({
      url: '../settings/settings'
    })
  },
  toAbout: function () {
    wx.navigateTo({
      url: '../about/about'
    })
  },
  toData: function () {
    wx.navigateTo({
      url: '../data/data'
    })
  },
  toCalendar: function () {
    wx.navigateTo({
      url: '../calendar/calendar'
    })
  },
  toReview: function () {
    wx.navigateTo({
      url: '../review/review'
    })
  },
  toHelp: function () {
    wx.navigateTo({
      url: '../help/help'
    })
  }
};
const mapStateToData = state => {
  const ids = {
    ...state.ids
  };
  const entities = {
    ...state.entities
  };
  const u_id = wx.getStorageSync('u_id');
  const taskFlowsCnt = ids.task_flows.length;
  const tfs = ids.task_flows.map(tf_id => entities.task_flows[tf_id]);
  const finishedCnt = tfs.filter(tf => tf.is_completed).length;
  const myTaskFlowsCnt = tfs.filter(tf => tf.leader_id === u_id).length;
  const _dayBox = [];
  for (let key in state.dayBox) {
    _dayBox.push({ ...state.dayBox[key] });
  }
  const dayBox = _dayBox.slice(-30);
  console.log("dayBox", dayBox);
  return {
    taskFlowsCnt,
    myTaskFlowsCnt,
    finishedCnt,
    dayBox
  }
}
const mapDispatchToPage = dispatch => ({

});
const _page = connect(mapStateToData, mapDispatchToPage)(page);
Page(_page);
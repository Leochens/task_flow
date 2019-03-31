// pages/task_flow/task_flow.js
import {
  connect
} from '../../libs/wechat-weapp-redux';
const app = getApp();

const page = {

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    tf_name: '',
    tf_describe: '',
    leader: {},
    is_completed: false,
    tasks: [],
    begin_time: '',
    end_time: '',
    category: '',
    members: [],
    CustomBar: app.globalData.CustomBar,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideTabBar({});
    const tf = options.tf;
    if (!tf) return;
    const _tf = JSON.parse(options.tf);
    console.log(_tf);
    const { id, tf_name, tf_describe, leader_id, is_completed, tasks, members, begin_time, end_time,
      category } = _tf;

    this.setData({
      id,tf_describe,tf_name,is_completed,tasks,begin_time,end_time,category,members,
      leader: members.filter(mem=>mem.id === leader_id)[0]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
};

const mapStateToData = state => {
  return {

  }
}

const mapDispatchToPage = dispatch => {
  return {

  }
}
const _page = connect(mapStateToData, mapDispatchToPage)(page);
Page(_page)
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
  // 加新的子任务
  addTask:function(){
    const {begin_time,end_time} = this.data;
    const time = {
      beginDate:begin_time,
      endDate:end_time
    }
    wx.navigateTo({
      url: './create_task/create_task?time='+JSON.stringify(time)+"&tf_id="+this.data.id,
    })
  },
  // 邀请新成员
  addMember:function(){
    wx.navigateTo({
      url: './add_member/add_member',
    })
  },
  // 加入星标
  addFavor: function(){
    console.log("加入星标");
  },
  // 任务数据
  checkData: function(){
    wx.navigateTo({
      url: './task_flow_data/task_flow_data',
    })
  },
  my_tasks:function(){
    wx.navigateTo({
      url: './my_tasks/my_tasks',
    })
  },
  // 查看全部成员
  allMembers: function(){

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
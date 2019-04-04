// pages/task/task.js
import {
  connect
} from '../../libs/wechat-weapp-redux';
import { fetchTaskMemberStatus } from '../../actions/index';
const page = {

  /**
   * 页面的初始数据
   */
  data: {
    task: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    const task = JSON.parse(options.task);
    // 获得task后紧接着获得这个task的评论和人员的状态
    const t_id = task.id;
    const u_ids = task.members.map(mem=>mem.id);
    console.log(u_ids);
    this.fetchTaskMemberStatus(t_id,JSON.stringify(u_ids));
    this.setData({
      task,
    });
    

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const status = [...this.data.status];
    this.setData({
      status
    });
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
}

const mapStateToData = state => {
  
  return {
    status: state.currentTaskMemberStatus
  };
}
const mapDispatchToPage = dispatch => ({
  fetchTaskMemberStatus: (t_id,u_ids) => dispatch(fetchTaskMemberStatus(t_id,u_ids))
})
const _page = connect(mapStateToData, mapDispatchToPage)(page);
Page(_page);
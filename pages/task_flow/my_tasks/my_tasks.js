// pages/task_flow/my_tasks/my_tasks.js
import {
  connect
} from '../../../libs/wechat-weapp-redux';
import { applyTakeBreak, completeTask } from '../../../actions/index';
import { recordOperation, TYPE } from '../../../actions/record';

import replaceChar from '../../../utils/replaceChar';
const page = {

  /**
   * 页面的初始数据
   */
  data: {
    tf_id: '',
    tf_name: '',
    tasks: [],
    u_name: wx.getStorageSync('userInfo').nickName,
    myTasks: [],
    showInputIndex: -1,
    breakTaskId: '',
    break_reason: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const tf_id = options.tf_id;
    const tasks = JSON.parse(options.tasks);
    const tf_name = options.tf_name
    const tf_status = options.tf_status
    this.setData({
      tf_id,
      tasks,
      tf_name,
      tf_status
    })
  },
  _taskFilter: function (tf_id, u_id, tasks) {
    return tasks.filter(task => {
      const memberIds = task.members;
      return (memberIds.includes(u_id) && task.tf_id === tf_id)
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const { tf_id, tasks, status } = this.data;
    const u_id = wx.getStorageSync('u_id');

    const myTasks = this._taskFilter(tf_id, u_id, tasks);
    myTasks.forEach(task => {
      const { status_map } = task;
      const status = status_map.filter(sm => u_id === sm.u_id)[0].user_status;
      task.myStatus = status;
    })
    console.log(myTasks);
    this.setData({
      myTasks
    });

  },

  completeTask: function (e) {
    console.log(e);
    const t_id = e.currentTarget.dataset.tid;
    const u_id = wx.getStorageSync('u_id');
    const that = this;

    wx.showModal({
      title: "提示",
      content: "您确定完成该任务吗",
      success: function (e) {
        if (e.confirm) {
          that._completeTask(t_id, u_id);
          // 后端请求完成任务的api
          const task = that.data.tasks[t_id];
          task && that.recordOperation(`完成子任务[${task.t_name}]`, TYPE.UPDATE);
        }
      }
    })

  },
  applyBreak: function (e) {
    console.log("e=>", e);
    const index = e.target.dataset.idx;
    this.setData({
      showInputIndex: index,
      breakTaskId: e.target.dataset.tid
    });
  },
  inputChange: function (e) {
    const break_reason = e.detail.value;
    console.log(break_reason);
    this.setData({
      break_reason
    })
  },
  sendApply: function () {
    console.log("准备发射请求");
    const { breakTaskId, break_reason, showInputIndex } = this.data;
    if (!replaceChar(break_reason)) return wx.showModal({
      title: "数据错误",
      content: "请勿包含特殊字符"
    });

    const u_id = wx.getStorageSync('u_id');
    const task = this.data.tasks[showInputIndex];
    this.applyTakeBreak(breakTaskId, u_id, break_reason);
    task && this.recordOperation(`子任务[${task.t_name}]申请请假`, TYPE.UPDATE);

    setTimeout(wx.navigateBack, 300);
    this.setData({
      showInputIndex: -1,
    })

  },
  cancelApply: function () {
    this.setData({
      showInputIndex: -1,
      breakTaskId: '',
      break_reason: ''
    })
  },
  taskDetail: function (e) {
    const tid = e.currentTarget.dataset.tid;
    wx.navigateTo({
      url: '../../task/task?t_id=' + tid
    })
  },
}


const mapStateToData = state => {

  return {
    // status: state.currentTaskMemberStatus
  };
}
const mapDispatchToPage = dispatch => ({
  applyTakeBreak: (t_id, u_id, break_reason) => dispatch(applyTakeBreak(t_id, u_id, break_reason)),
  _completeTask: (t_id, u_id) => dispatch(completeTask(t_id, u_id)),
  recordOperation: (msg, op_type) => dispatch(recordOperation(msg, op_type))

})
const _page = connect(mapStateToData, mapDispatchToPage)(page);
Page(_page);
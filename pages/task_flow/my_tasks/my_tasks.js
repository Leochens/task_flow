// pages/task_flow/my_tasks/my_tasks.js
import {
  connect
} from '../../../libs/wechat-weapp-redux';
// import { fetchTaskMemberStatus } from '../../../actions/index';
const page = {

  /**
   * 页面的初始数据
   */
  data: {
    tf_id: '',
    tf_name: '',
    tasks: [],
    u_id: wx.getStorageSync('u_id'),
    u_name: wx.getStorageSync('userInfo').nickName,
    myTasks: [],
    showInputIndex: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const tf_id = options.tf_id;
    const tasks = JSON.parse(options.tasks);
    const tf_name = options.tf_name
    this.setData({
      tf_id,
      tasks,
      tf_name
    })
  },
  _taskFilter: function (tf_id, u_id, tasks) {
    return tasks.filter(task => {
      const memberIds = task.members.map(mem => mem.id);
      return (memberIds.includes(u_id) && task.tf_id === tf_id)
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const { tf_id, tasks, u_id, status } = this.data;

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
  applyBreak: function (e) {
    const index = e.target.dataset.idx;
    console.log("操作哪个?", index);
    this.setData({
      showInputIndex: index
    })
  }
}


const mapStateToData = state => {

  return {
    // status: state.currentTaskMemberStatus
  };
}
const mapDispatchToPage = dispatch => ({
  // fetchTaskMemberStatus: (t_id,u_ids) => dispatch(fetchTaskMemberStatus(t_id,u_ids))
})
const _page = connect(mapStateToData, mapDispatchToPage)(page);
Page(_page);
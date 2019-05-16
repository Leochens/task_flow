// pages/task/task_settings/task_settings.js
import {
  connect
} from '../../../libs/wechat-weapp-redux';
import { changeTaskInfo } from '../../../actions/index';
import { compareDate } from '../../../utils/util';
import replaceChar from '../../../utils/replaceChar';
const app = getApp();
const page = {
  data: {
    modalName: '',
    t_id: '',
    task: {},
    tf: {},
    selectedMembers: [],
    selectedMembersNames: [],
    selectedMembersIds: [],
    timeLimit: {},
    endDate: '',
    beginDate: '',
    isLeader: false
  },
  onLoad: function (options) {
    const t_id = options.t_id;
    this.setData({
      t_id
    })
  },
  onShow: function () {
    const task = this.data.getTask(this.data.t_id);
    const tf_id = task.tf_id;
    const tf = this.data.getTaskFlow(tf_id);
    const timeLimit = {
      endDate: tf.end_time,
      beginDate: tf.begin_time
    }
    this.setData({
      task, tf,
      endDate: task.end_time,
      beginDate: task.begin_time,
      timeLimit,
      isLeader: app.globalData.u_id === tf.leader_id
    })
  },
  showModal: function (e) {
    const modalName = e.currentTarget.dataset.target;
    this.setData({
      modalName
    });
  },
  changeTaskName: function (e) {
    console.log(e);
    const { task: { tf_id, id: t_id } } = this.data;
    const u_id = app.globalData.u_id;
    const t_name = replaceChar(e.detail.value.t_name);
    this.changeTaskInfo(tf_id, u_id, t_id, 't_name', t_name, this.onShow);
    this.hideModal();
  },
  changeTaskDescribe: function (e) {
    const { task: { tf_id, id: t_id } } = this.data;
    const u_id = app.globalData.u_id;
    const t_describe = replaceChar(e.detail.value.t_describe);
    this.changeTaskInfo(tf_id, u_id, t_id, 't_describe', t_describe, this.onShow);
    this.hideModal();
  },
  changeEndTime: function (e) {
    const { endDate, task: { tf_id, id: t_id } } = this.data;
    const u_id = app.globalData.u_id;

    //api
    this.changeTaskInfo(tf_id, u_id, t_id, 'end_time', endDate, this.onShow);
    this.hideModal();
  },
  addMember: function () { // 新增成员
    const t_members = this.data.task.members.map(m => m.id);
    const members = this.data.tf.members.filter(m => !t_members.includes(m.id));
    wx.navigateTo({
      url: '../../task_flow/create_task/select_member/select_member?members=' + JSON.stringify(members)
    });
  },
  confirmAddMember: function () {
    const { selectedMembersIds, task: { tf_id, id: t_id } } = this.data;
    const u_id = app.globalData.u_id;
    if (!selectedMembersIds.length) return;
    // api添加
    this.changeTaskInfo(tf_id, u_id, t_id, 'members', JSON.stringify(selectedMembersIds), this.onShow);
    this.hideModal();
  },
  bindEndDateChange: function (e) {
    const endDate = e.detail;
    const {
      endDate: oldEndDate,
      beginDate,
      timeLimit
    } = this.data;

    console.log("endDate", e.detail);
    if (compareDate(endDate, timeLimit.endDate)) {
      wx.showModal({
        title: '日期选择有误',
        content: '结束日期不能比任务流结束日期大',
      })
      this.setData({
        endDate: oldEndDate
      })
      return false;
    }
    if (compareDate(beginDate, endDate)) {
      wx.showModal({
        title: '日期选择有误',
        content: '结束日期不能比开始日期小',
      })
      this.setData({
        endDate: oldEndDate
      })
      return false;
    }
    this.setData({
      endDate
    })
  },
  toLog: function () {
    wx.navigateTo({
      url: '../../log/log?id=' + this.data.task.id + '&type=t'
    })
  },
  hideModal: function () {
    this.setData({
      modalName: ''
    })
  }
}
const mapStateToData = state => {
  const tasks = { ...state.entities.tasks };
  const members = { ...state.entities.members };
  const task_flows = { ...state.entities.task_flows };
  const getTaskFlow = tf_id => {
    const tf = { ...task_flows[tf_id] };
    const mems = tf.members.slice();
    tf.members = mems.map(m => members[m]);
    return tf;
  };
  const getTask = t_id => {
    const t = { ...tasks[t_id] };
    t.members = [...t.members].map(m => ({ ...members[m] }));
    return t;
  };
  return {
    getTask,
    getTaskFlow
  }
}
const mapDispatchToPage = dispatch => ({
  changeTaskInfo: (tf_id, u_id, t_id, field, value, callback) => dispatch(changeTaskInfo(tf_id, u_id, t_id, field, value, callback))
})
const _page = connect(mapStateToData, mapDispatchToPage)(page);
Page(_page);
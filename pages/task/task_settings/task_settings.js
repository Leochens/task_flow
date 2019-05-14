// pages/task/task_settings/task_settings.js
import {
  connect
} from '../../../libs/wechat-weapp-redux';
import { changeTaskInfo } from '../../../actions/index';
const app = getApp();
const page = {
  data: {
    modalName: '',
    t_id: '',
    task: {}
  },
  onLoad: function (options) {
    const t_id = options.t_id;
    this.setData({
      t_id
    })
  },
  onShow: function () {
    const task = this.data.getTask(this.data.t_id);
    this.setData(
      { task }
    )
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
    const t_name = e.detail.value.t_name;
    this.changeTaskInfo(tf_id, u_id, t_id, 't_name', t_name, this.onShow);
    this.hideModal();
  },
  changeTaskDescribe: function (e) {
    const { task: { tf_id, id: t_id } } = this.data;
    const u_id = app.globalData.u_id;
    const t_describe = e.detail.value.t_describe;
    this.changeTaskInfo(tf_id, u_id, t_id, 't_describe', t_describe, this.onShow);
    this.hideModal();
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
  const getTask = t_id => {
    const t = { ...tasks[t_id] };
    t.members = [...t.members].map(m => ({ ...members[m] }));
    return t;
  };
  return {
    getTask
  }
}
const mapDispatchToPage = dispatch => ({
  changeTaskInfo: (tf_id, u_id, t_id, field, value, callback) => dispatch(changeTaskInfo(tf_id, u_id, t_id, field, value, callback))
})
const _page = connect(mapStateToData, mapDispatchToPage)(page);
Page(_page);
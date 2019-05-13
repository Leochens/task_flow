// pages/task_flow/tf_settings/tf_settings.js

import {
  connect
} from '../../../libs/wechat-weapp-redux';
import { toggleTaskFlowMemverInvite, transferLeader } from '../../../actions/index';
const app = getApp();
const page = {
  data: {
    tf_id: '',
    is_leader: false,
    invite: true,
    isModalActive: false,
    transferUid: ''
  },
  onLoad: function (options) {
    console.log(options);
    const tf_id = options.tf_id;
    const is_leader = options.is_leader === 'true' ? true : false;
    const invite = Number(options.invite);
    const tf = this.data.getTaskFlow(tf_id);
    const u_id = app.globalData.u_id;
    this.setData({
      tf_id,
      is_leader,
      invite,
      tf,
      u_id
    })
  },
  toggleInviteStatus: function () {
    const { tf_id, invite } = this.data;
    const u_id = app.globalData.u_id;
    this.toggleTaskFlowMemverInvite(u_id, tf_id, !invite);
    this.setData({
      invite: !invite
    })
  },
  toLogs: function () {
    wx.navigateTo({
      url: '../../log/log?id=' + this.data.tf_id + "&type=tf"
    })
  },
  exitTaskFlow: function () {
    // 退出任务流 如果是leader 
    if (!this.data.is_leader) return;
    const { getTaskFlow, tf_id } = this.data;
    const cnt = getTaskFlow(tf_id).members.length;
    if (cnt === 1) { //并且现在任务流中只有他一个人 那么退出任务流就是解散任务流
      this.breakTaskFlow();
    } else if (cnt > 1) { // 有其他人 要转让负责人
      this.transferLeader();
    } else return;
  },
  breakTaskFlow: function () {
    // 解散任务流
  },
  hideModal: function () {
    this.setData({
      isModalActive: false
    })
  },
  transferLeader: function () {
    // 转让负责人
    this.setData({
      isModalActive: true
    });
  },
  confirmTransferLeader: function () { // 确认转让负责人
    // api
    const { tf_id, transferUid } = this.data;
    if (!transferUid) return wx.showToast({ title: "请选择转让人" });
    this._transferLeader(tf_id, transferUid);
    this.hideModal();
    this.setData({
      transferUid: ''
    })
  },
  radioChange: function (e) {
    console.log(e);
    const u_id = e.currentTarget.dataset.uid;
    console.log("要转让的负责人的id", u_id);
    this.setData({
      transferUid: u_id
    })
  }

}
const mapStateToData = state => {

  const getTaskFlow = tf_id => {
    const members = { ...state.entities.members };
    const tf = { ...state.entities.task_flows[tf_id] };
    const mem = [...tf.members];
    tf.members = mem.map(mid => members[mid]);
    return tf;
  }

  return {
    getTaskFlow
  }
}

const mapDispatchToPage = dispatch => {
  return {
    toggleTaskFlowMemverInvite: (u_id, tf_id, status) => dispatch(toggleTaskFlowMemverInvite(u_id, tf_id, status)),
    _transferLeader: (tf_id, new_leader_id) => dispatch(transferLeader(tf_id, new_leader_id))
  }
}
const _page = connect(mapStateToData, mapDispatchToPage)(page);
Page(_page)


// pages/task_flow/tf_settings/tf_settings.js

import {
  connect
} from '../../../libs/wechat-weapp-redux';
import replaceChar from '../../../utils/replaceChar';
import { toggleTaskFlowMemverInvite, transferLeader, finishTaskFlow, deleteTaskFlow, breakTaskFlow } from '../../../actions/index';
import { recordOperation, TYPE } from '../../../actions/record';

const app = getApp();
const page = {
  data: {
    tf_id: '',
    is_leader: false,
    invite: true,
    isModalActive: false,
    transferUid: '',
    tf: {}
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
    // 退出任务流 
    const { getTaskFlow, tf_id } = this.data;
    const that = this;
    if (this.data.is_leader) {// 如果是leader
      const cnt = getTaskFlow(tf_id).members.length;
      if (cnt === 1) { //并且现在任务流中只有他一个人 那么退出任务流就是解散任务流
        this._breakTaskFlow("当前任务流中只有你一个成员,");
      } else if (cnt > 1) { // 有其他人 要转让负责人
        wx.showModal({
          title: "提示",
          content: "您是负责人,在退出之前,您应再选择一位负责人,请选择完负责人后再退出",
          success: function (e) {
            if (e.confirm) {
              that.transferLeader();
            }
          }
        })
      } else return;
    } else { // 普通成员
      this._quit();
    }

  },
  _breakTaskFlow: function (msg) {
    // 解散任务流
    const that = this;
    const { tf } = that.data;
    wx.showModal({
      title: '警告',
      content: typeof msg === 'string' ? msg : '' + "退出任务流即代表解散任务流，是否继续?",
      success: function (e) {
        if (e.confirm) {
          console.log("解散任务流")
          that.breakTaskFlow(app.globalData.u_id, that.data.tf_id);
          that.recordOperation(`解散任务流${tf.tf_name}`, TYPE.DELETE);
          wx.reLaunch({
            url: '/pages/index/index?refresh=true',
          })
        }
      }
    });
  },
  _quit: function () {
    const { tf_id, tf } = this.data;
    const u_id = app.globalData.u_id;
    const that = this;
    wx.showModal({
      title: '警告',
      content: "退出任务流将会删除该任务流中所有与你相关的子任务",
      success: function (e) {
        if (e.confirm) {
          that.deleteTaskFlow(u_id, tf_id);
          that.recordOperation(`退出任务流${tf.tf_name}`, TYPE.DELETE);
          wx.reLaunch({
            url: '/pages/index/index',
          })
        }
      }
    })
  },
  finish: function () {
    const { tf_id, u_id, tf } = this.data;
    const that = this;
    wx.showModal({
      title: '警告',
      content: "确定要提前完成任务流吗,继续将不可添加新成员,不可添加子任务,任务流一旦完成便不可逆,是否继续?",
      success: function (e) {
        if (e.confirm) {
          that.finishTaskFlow(u_id, tf_id);
          that.recordOperation(`提前完成任务流${tf.tf_name}`, TYPE.DELETE);

          wx.reLaunch({
            url: '/pages/index/index',
          });
        }
      }
    })
  },
  hideModal: function () {
    this.setData({
      isModalActive: false
    })
  },
  transferLeader: function () {
    if (this.data.tf.members.length === 1) return wx.showModal({
      title: "转让失败",
      content: "无剩余成员可选"
    });
    // 转让负责人
    this.setData({
      isModalActive: true
    });
  },
  confirmTransferLeader: function () { // 确认转让负责人
    const { tf_id, transferUid,tf } = this.data;
    if (!transferUid) return wx.showToast({ title: "请选择转让人" });
    this._transferLeader(tf_id, transferUid);
    this.recordOperation(`转让任务流${tf.tf_name}`, TYPE.DELETE);
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
    _transferLeader: (tf_id, new_leader_id) => dispatch(transferLeader(tf_id, new_leader_id)),
    finishTaskFlow: (u_id, tf_id) => dispatch(finishTaskFlow(u_id, tf_id)),
    deleteTaskFlow: (u_id, tf_id) => dispatch(deleteTaskFlow(u_id, tf_id)),
    breakTaskFlow: (u_id, tf_id) => dispatch(breakTaskFlow(u_id, tf_id)),
    recordOperation: (msg, op_type) => dispatch(recordOperation(msg, op_type))
  }
}
const _page = connect(mapStateToData, mapDispatchToPage)(page);
Page(_page)


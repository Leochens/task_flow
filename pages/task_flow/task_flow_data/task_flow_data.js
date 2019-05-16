// pages/task_flow/task_flow_data/task_flow_data.js

import getTaskFlowRing from './charts/ring';
import getMemberColumn from './charts/column';
import { formatTime } from '../../../utils/util';
import APP from '../../../appConfig'
// 此页面可以分享 用户天然的快照属性 因为分享时的数据是暂时的
// 当onLoad里的option中的isShare为true时 使用分享数据 并关闭刷新按钮
// 如果不是share的 那么就用拉取数据来看
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tf_id: '',
    taskFlowRing: {},
    memberColumn: {},
    tfData: {
      tf_name: ' ',
      tf_describe: ' ',
      tf_leader: " ",
      task_flow: {
        continues: 0,
        delay: 0,
        completed: 0,
        all: 0
      },
      task: [],
      images: [],
      comments: [],
      members: [ // 每个人的任务完成情况
      ]
    },
    showColumn: true
  },
  getWidth: function () {
    let windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    return windowWidth;
  },
  toggleShowColumn: function () {
    this.setData({
      showColumn: !this.data.showColumn
    })
  },
  fetch: function () {
    const that = this;
    const tf_id = this.data.tf_id;
    const windowWidth = this.getWidth();
    wx.request({
      url: `${APP.apiBaseUrl}/users/${app.globalData.u_id}/task_flows/${tf_id}/data`,
      success: function (res) {
        console.log(res);
        // return;
        const { data: { data: tfData } } = res;
        that.setData({
          tfData,
          taskFlowRing: getTaskFlowRing(windowWidth, 'taskFlowRing', tfData.task_flow),
          memberColumn: tfData.members.length ? getMemberColumn(windowWidth, 'memberColumn', tfData.members) : null
        });
      },
      fail: function (err) {
        console.log(err);
        wx.showToast({
          title: "请求失败"
        })
      }
    })
  },
  getShareData: function () {
    const { tfData } = this.data;
    const windowWidth = this.getWidth();
    this.setData({
      tfData,
      taskFlowRing: getTaskFlowRing(windowWidth, 'taskFlowRing', tfData.task_flow),
      memberColumn: tfData.members.length ? getMemberColumn(windowWidth, 'memberColumn', tfData.members) : null
    });
  },
  onShow: function () {
    const { isShare } = this.data;

    if (!isShare) this.fetch();
    else this.getShareData();
  },
  onLoad: function (options) {
    const { tf_id, data, date } = options;
    const tfData = data ? JSON.parse(options.data) : null;
    const isShare = options.isShare;
    wx.showModal({
      title: "hello",
      content: options
    })
    this.setData({
      tfData: tfData || this.data.tfData,
      tf_id: tf_id || '',
      isShare: isShare || false,
      date: date || ''
    })
  },

  touchstart(e) {
    if (this.data.memberColumn) {
      this.data.memberColumn.scrollStart(e);
    }
  },
  touchmove(e) {
    if (this.data.memberColumn) {
      this.data.memberColumn.scroll(e);
    }
  },
  touchend(e) {
    if (this.data.memberColumn) {
      this.data.memberColumn.scrollEnd(e);
    }
  },
  onShareAppMessage: function (e) {
    console.log(e);
    wx.showShareMenu({
      withShareTicket: true
    })

    return {
      title: `${this.data.tfData.tf_name}数据统计`,//分享内容
      path: '/pages/task_flow/task_flow_data/task_flow_data?data=' + JSON.stringify(this.data.tfData) + '&isShare=true&tf_id=' + this.data.tf_id + "&date=" + formatTime(new Date()),
    }
  }
})
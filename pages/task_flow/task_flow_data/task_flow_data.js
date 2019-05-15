// pages/task_flow/task_flow_data/task_flow_data.js

import getTaskFlowRing from './charts/ring';
import getMemberColumn from './charts/column';
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
      task: [ ],
      images:[],
      comments:[],
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
  onShow:function(){
    const windowWidth = this.getWidth();
    const tf_id = this.data.tf_id;

    const that = this;
    wx.request({
      url: `${APP.apiBaseUrl}/users/${app.globalData.u_id}/task_flows/${tf_id}/data`,
      success: function (res) {
        console.log(res);
        const { data: { data: tfData } } = res;
        that.setData({
          tfData,
          taskFlowRing: getTaskFlowRing(windowWidth, 'taskFlowRing', tfData.task_flow),
          memberColumn: getMemberColumn(windowWidth, 'memberColumn', tfData.members)
        });
      }
    })
  },
  onLoad: function (options) {
    const tf_id = options.tf_id
    const windowWidth = this.getWidth();
    // const tf_id = '4f8a9123b2d54c1479e66d16d28a69af';
    const {
      tfData
    } = this.data;
    this.setData({
      taskFlowRing: getTaskFlowRing(windowWidth, 'taskFlowRing', tfData.task_flow),
      memberColumn: getMemberColumn(windowWidth, 'memberColumn', tfData.members),
      tf_id
    });
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

})
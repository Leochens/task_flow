// pages/create_task_flow/create_task_flow.js
const app = getApp();
import {
  compareDate,
  formatTime
} from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    beginDate: formatTime(new Date()),
    endDate: formatTime(new Date())
  },

  bindBeginDateChange: function (e) {
    const {
      beginDate: oldBegindate,
      endDate
    } = this.data;
    const beginDate = e.detail;
    console.log("beginDate", e.detail);
    if (compareDate(beginDate, endDate)) {
      wx.showModal({
        title: '日期选择有误',
        content: '开始日期不能比结束日期大',
      });
      this.setData({
        beginDate: oldBegindate
      })
      return false
    };
    this.setData({
      beginDate
    })
  },
  bindEndDateChange: function (e) {
    const endDate = e.detail;
    const {
      endDate: oldEndDate,
      beginDate
    } = this.data;
    console.log("endDate", e.detail);
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
  }
})
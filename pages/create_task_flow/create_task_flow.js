// pages/create_task_flow/create_task_flow.js
const app = getApp();
import { compareDate } from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    beginDate: null,
    endDate: null
  },

  bindBeginDateChange: function(e){
    const beginDate = e.detail.value;
    const endDate = this.data.endDate;
    if(endDate){
      if(compareDate(beginDate,endDate)) {
        wx.showModal({
          title: '日期选择有误',
          content: '开始日期不能比结束日期大',
        })
        return false
      };
    }
    this.setData({
      beginDate
    })
  },
  bindEndDateChange: function(e){
    const endDate = e.detail.value;
    const beginDate = this.data.beginDate;
    console.log(beginDate,endDate);
    if(beginDate){
      if(compareDate(beginDate,endDate)) {
        wx.showModal({
          title: '日期选择有误',
          content: '结束日期不能比开始日期小',
        })
        return false;
        }
    }
    this.setData({
      endDate
    })
  }
})
// pages/create_task_flow/create_task_flow.js
const app = getApp();
import {
  compareDate,
  formatTime
} from '../../utils/util';
import { connect } from '../../libs/wechat-weapp-redux';
import {
  addTaskFlow,
  updateTaskFlow
} from '../../actions/index';
const _page = {

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    beginDate: formatTime(new Date()),
    endDate: formatTime(new Date()),
    leader: wx.getStorageSync('userInfo').nickName,
    isUpdate: false,
    curCate: '默认分类',
    index: 0,
    categories: []
  },
  getCategories: function () {
    const categories = app.globalData.categories;
    this.setData({
      categories,
      index: 0
    })
  },
  bindPickerChange: function (e) {
    console.log(e);
    const index = e.detail.value;
    this.setData({
      index,
      curCate: this.data.categories[index]
    })
  },
  onLoad: function (options) {
    if (!options) return;
    const { flag, tf_id, tf_name, tf_describe, end_time } = options;
    console.log(options);
    this.getCategories();
    if (tf_id && flag && flag === 'update') {
      this.setData({
        isUpdate: true,
        tf_id,
        tf_name,
        tf_describe,
        end_time
      })
    }


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
      endDate,
      end_time: endDate
    })
  },
  onSubmit: function (e) {

    console.log("表单提交事件", e);
    const { tf_name, tf_describe } = e.detail.value;
    if (!tf_name || !tf_describe) {

      return;
    }

    const { beginDate: begin_time, endDate: end_time, isUpdate, curCate } = this.data;
    const u_id = wx.getStorageSync('u_id');
    if (isUpdate) {
      this.updateTaskFlow(u_id, this.data.tf_id, JSON.stringify({
        tf_name,
        tf_describe,
        begin_time: begin_time,
        end_time,
        leader_id: u_id,
        category: curCate
      }));
    } else {
      this.addTaskFlow(u_id, JSON.stringify({
        tf_name,
        tf_describe,
        begin_time,
        end_time,
        leader_id: u_id,
        category: curCate
      }));
    }


  }
};
const mapStateToData = state => {
  return {

  }
}
const mapDispatchToPage = dispatch => {
  return {
    addTaskFlow: (u_id, tf) => dispatch(addTaskFlow(u_id, tf)),
    updateTaskFlow: (u_id, tf_id, tf) => dispatch(updateTaskFlow(u_id, tf_id, tf))
  }
}

const page = connect(mapStateToData, mapDispatchToPage)(_page);
Page(page)
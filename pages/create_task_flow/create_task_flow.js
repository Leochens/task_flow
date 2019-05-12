// pages/create_task_flow/create_task_flow.js
const app = getApp();
import {
  compareDate,
  compareDate2,
  formatTime
} from '../../utils/util';
import { connect } from '../../libs/wechat-weapp-redux';
import {
  addTaskFlow,
  updateTaskFlow
} from '../../actions/index';
const day = 1000 * 60 * 60 * 24;
const nextDay = new Date((Date.parse(new Date()) + day));

const _page = {

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    beginDate: formatTime(new Date()),
    endDate: formatTime(nextDay),
    leader: wx.getStorageSync('userInfo').nickName,
    isUpdate: false,
    curCate: '默认分类',
    tf_id: "",
    tf_name: "",
    tf_describe: "",
    index: 0,
    categories: [],
    hideModal: true,
    newCateName: ''
  },
  getCategories: function () {
    const categories = app.globalData.categories;
    this.setData({
      categories,
      index: 0
    })
  },
  bindPickerChange: function (e) {
    const index = e.detail.value;
    this.setData({
      index,
      curCate: this.data.categories[index]
    })
  },
  onLoad: function (options) {
    console.log("options", options);
    if (!options) return;
    const { flag, tf_id, tf_name, tf_describe, end_time, begin_time } = options;
    this.getCategories();
    if (tf_id && flag && flag === 'update') {
      this.setData({
        isUpdate: true,
        tf_id,
        tf_name,
        tf_describe,
        endDate: end_time,
        beginDate: begin_time,
        end_time,
        begin_time
      })
    }
  },
  bindBeginDateChange: function (e) {
    const {
      beginDate: oldBegindate,
      endDate
    } = this.data;
    const beginDate = e.detail;
    if (compareDate2(beginDate, endDate)) {
      wx.showModal({
        title: '日期选择有误',
        content: '开始日期应小于结束日期',
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
    if (compareDate2(formatTime(new Date()), endDate)) {
      wx.showModal({
        title: '日期选择有误',
        content: '结束时间应大于现在的时间',
      })
      this.setData({
        endDate: oldEndDate
      });
      return false;
    }
    if (compareDate2(beginDate, endDate)) {
      wx.showModal({
        title: '日期选择有误',
        content: '结束日期应大于开始日期',
      })
      this.setData({
        endDate: oldEndDate
      })
      return false;
    }
    if (this.data.isUpdate) {
      const { testDate, tf_id } = this.data;
      const flag = testDate(tf_id, endDate);
      if (!flag) {
        wx.showModal({
          title: '日期选择有误',
          content: "结束日期应比所有子任务的结束日期大,请修改子任务的日期后再修改",
        })
        this.setData({
          endDate: oldEndDate,
        })
        return false;
      }
    }
    this.setData({
      endDate,
      end_time: endDate
    })
  },
  onSubmit: function (e) {
    const { tf_name, tf_describe } = e.detail.value;
    console.log(e, this.data);
    if (!tf_name || !tf_describe) {
      wx.showToast({
        title: "请填写必填字段"
      })
      return;
    }

    const { beginDate: begin_time, endDate: end_time, isUpdate, curCate } = this.data;
    const u_id = wx.getStorageSync('u_id');
    if (isUpdate) {
      console.log("开始更新")
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
  },
  addCate: function () {
    this.setData({
      hideModal: false
    })
  },
  cancelM: function () {
    this.setData({
      hideModal: true,
      newCateName: ''
    })
  },
  confirmM: function () {
    // 将新的分类添加到data中并选择它
    const { newCateName } = this.data;
    const categories = this.data.categories.slice();

    if (!newCateName) {
      this.setData({
        hideModal: true
      });
      return;
    }

    categories.push(newCateName);
    app.globalData.categories = categories;
    this.setData({
      categories,
      newCateName: '',
      index: categories.length - 1,
      hideModal: true,
      curCate: newCateName
    })

  },
  inputCategory: function (e) {
    console.log(e);
    const newCateName = e.detail.value;
    this.setData({
      newCateName
    })
  }
};
const mapStateToData = state => {
  const tasks = { ...state.entities.tasks };
  const testDate = (tf_id, end_time) => {
    for (let t_id in tasks) {
      if (tasks[t_id].tf_id === tf_id && compareDate(tasks[t_id].end_time, end_time)) {
        return false;
      }
    }
    return true;
  }
  return {
    testDate
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
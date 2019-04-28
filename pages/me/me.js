// pages/me/me.js
import {
  connect
} from '../../libs/wechat-weapp-redux';
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime';


const page = {

  /**
   * 页面的初始数据
   */
  data: {
    taskFlowsCnt: 0,
    myTaskFlowsCnt: 0,
    finishedCnt: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  toSettings: function () {

    // wx.navigateTo({
    //   url:'../settings/settings'
    // })
  },
  toCategory: function () {
    wx.navigateTo({
      url: '../category/category'
    })
  },
  toAbout: function () {
    wx.navigateTo({
      url: '../about/about'
    })
  },
  toData: function () {
    wx.navigateTo({
      url: '../data/data'
    })
  },
  toTemplate: function () {
    // wx.navigateTo({
    //   url: '../task_flow_template/task_flow_template'
    // })
  },
  toCalendar: function () {
    wx.navigateTo({
      url: '../calendar/calendar'
    })
  }
};
const mapStateToData = state => {
  const ids = { ...state.ids };
  const entities = { ...state.entities };
  const u_id = wx.getStorageSync('u_id');
  const taskFlowsCnt = ids.task_flows.length;
  const tfs = ids.task_flows.map(tf_id => entities.task_flows[tf_id]);
  const finishedCnt = tfs.filter(tf => tf.is_completed).length;
  const myTaskFlowsCnt = tfs.filter(tf => tf.leader_id === u_id).length;

  return {
    taskFlowsCnt,
    myTaskFlowsCnt,
    finishedCnt
  }
}
const mapDispatchToPage = dispatch => ({

});
const _page = connect(mapStateToData, mapDispatchToPage)(page);
Page(_page);
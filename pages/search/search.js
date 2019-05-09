// pages/search/search.js
import {
  connect
} from '../../libs/wechat-weapp-redux';
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime';
import { globalSearch, clearSeach } from '../../actions/index';
const app = getApp();
const page = {

  /**
   * 页面的初始数据
   */
  data: {
    task_flows: [],
    tasks: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.clearSeach();

  },
  onSearch: function (e) {
    const keyword = e.detail;
    if (!keyword.trim()) return console.log("key为空");
    console.log(e);
    const u_id = app.globalData.u_id;
    this.globalSearch(u_id, keyword);
  },
  toTaskFlowDetail: function (e) {
    const tf_id = e.currentTarget.dataset.tfid;
    wx.navigateTo({
      url: '../task_flow/task_flow?tf_id=' + tf_id
    })
  },
  toTaskDetail: function (e) {
    const t_id = e.currentTarget.dataset.tid;
    wx.navigateTo({
      url: '../task/task?t_id=' + t_id + "&isFetch=true"
    })
  }
};

const mapStateToData = (state) => {
  const search = { ...state.search };
  const task_flow_entities = { ...search.task_flows };
  const task_entities = { ...search.tasks };
  const task_flows = search.task_flow_ids.map(tf_id => task_flow_entities[tf_id]);
  const tasks = search.task_ids.map(t_id => task_entities[t_id]);

  return {
    task_flows,
    tasks
  };
}
const mapDispatchToPage = dispatch => ({
  globalSearch: (u_id, keyword, callback) => dispatch(globalSearch(u_id, keyword, callback)),
  clearSeach: () => dispatch(clearSeach())
})
const _page = connect(mapStateToData, mapDispatchToPage)(page);
Page(_page);
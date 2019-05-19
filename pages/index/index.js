//index.js
import {
  connect
} from '../../libs/wechat-weapp-redux';
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime';
const COMPLETE = '已完成';
const CONTINUE = '进行中';
// const RECENT = '近7天截止';
const initFilterItems = [
  {
    which: CONTINUE,
    active: false
  },
  {
    which: COMPLETE,
    active: false
  }
];
import {
  fetchUsers,
  fetchTasks,
  fetchTaskFlows,
  getPinTopTaskFlow,
  pinTopTaskFlow,
  cancelPinTopTaskFlow
} from '../../actions/index';
import {
  login,
  gotUserInfo
} from '../../actions/auth';
//获取应用实例
const app = getApp()
const page = {
  data: {
    hasAuth: false,
    showCom: true,
    currentIndex: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isClassify: false,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 1,
    scrollLeft: 0,
    height: app.globalData.height * 6,
    filterTaskFlowList: [],
    taskFlowList: [],
    pinTopTaskFlowList: [],
    searchResultList: [],
    currentCategoryTaskFlowList: [],
    searchKeyword: '',
    hasUserInfo: false,
    isPinTop: true,
    filter: false, // 是否进入筛选模式
    filterItems: initFilterItems,
    isPinTaskFlowFold: false, // 是否折叠置顶的
    isTaskFlowFold: false, // 是否折叠其他的,
    showAuthModal: false
  },
  toggleFilter: function () {

    const { filter } = this.data;

    this.setData({
      filter: !this.data.filter,
      filterTaskFlowList: [],
      filterItems: initFilterItems,
      tip: filter ? '选择一个条件' : ''
    })
  },
  toggleFoldPinTaskFlow: function () {
    this.setData({
      isPinTaskFlowFold: !this.data.isPinTaskFlowFold
    })
  },
  toggleFoldTaskFlow: function () {
    this.setData({
      isTaskFlowFold: !this.data.isTaskFlowFold
    })
  },
  onFilter: function (e) {
    const filterItemIndex = e.currentTarget.dataset.id;
    const filterItems = this.data.filterItems.slice();
    filterItems[filterItemIndex].active = !filterItems[filterItemIndex].active;
    // 开始筛选
    const filterContinueTaskFlows = filterItems[0].active;
    const filterCompleteTaskFlows = filterItems[1].active;
    const taskFlowList = this.data.taskFlowList.slice();
    const pinTopTaskFlowList = this.data.pinTopTaskFlowList.slice();
    // 因为所有任务流和置顶任务流是分开的 但是筛选是在一起筛选的 所以此处要合并一下
    const filterTaskFlowList = pinTopTaskFlowList.concat(taskFlowList).filter(tf => {
      if (filterCompleteTaskFlows && filterContinueTaskFlows) return true;
      if (filterContinueTaskFlows) return !tf.is_completed;
      if (filterCompleteTaskFlows) return tf.is_completed;
      return true;
    })
    this.setData({
      filterItems,
      filterTaskFlowList,
      tip: ''
    })
  },
  menuTabSelect(e) {
    const which = e.currentTarget.dataset.id;
    this.setData({
      TabCur: -1,
      scrollLeft: (which - 1) * 60,
      isClassify: which == 1 ? true : false
    })
  },
  backToMenu: function () {
    this.setData({
      filterTaskFlowList: [],
      searchKeyword: ''
    })
  },
  toHelp: function () {
    wx.navigateTo({
      url: '/pages/help/help'
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    if (!e.detail.userInfo) {
      return;
    }
    wx.setStorageSync('userInfo', e.detail.userInfo);
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
    // 向后端发送userInfo
    this.gotUserInfo(this.data.u_id, e.detail.userInfo);
    this.setData({
      showAuthModal: false
    });
    this._fetchTaskFlows(); // 重新拉取tf
    wx.showTabBar({});
  },
  pinTopTf: function (e) {
    const tf_id = e.currentTarget.dataset.tfid;
    this.data.isPinTop && this.pinTopTaskFlow(tf_id);
  },
  cancelPinTopTf: function (e) {
    const tf_id = e.currentTarget.dataset.tfid;
    this.data.isPinTop && this.cancelPinTopTaskFlow(tf_id);
  },
  classTabSelect(e) { // 按照分类筛选tf
    const { categories, taskFlowList } = this.data;
    const which = e.currentTarget.dataset.id;
    let isBack = false;
    if (which === 0) isBack = true;
    const curCat = categories[which]; // 获得当前选择的分类
    const currentCategoryTaskFlowList = taskFlowList.filter(tf => tf.category === curCat);
    this.setData({
      TabCur: which,
      scrollLeft: (which - 1) * 60,
      isClassify: !isBack,
      currentCategoryTaskFlowList
    })
  },

  handleTouchStart: function (e) {
    this.startTime = e.timeStamp;
  },
  //手指离开
  handleTouchEnd: function (e) {
    this.endTime = e.timeStamp;
  },
  toTaskFlowDetail: function (e) {
    if (this.endTime - this.startTime >= 350) return;
    const tf_id = e.target.dataset.tfid;
    wx.navigateTo({
      url: '../task_flow/task_flow?tf_id=' + tf_id
    })
  },
  toSearch: function (e) {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  addNewTaskFlow: function () {
    wx.navigateTo({
      url: '../create_task_flow/create_task_flow'
    })
  },
  // 检测SID是否过期 过期后要重新登录
  checkSID: function () {
    const SID = wx.getStorageSync('SID');
    const SID_EXPIRATION = wx.getStorageSync('SID_EXPIRATION')
    const now = Date.parse(new Date());
    if (SID && SID_EXPIRATION > now) { //存在SID并且没有过期
      console.log("存在SID并且没有过期", SID, now);
      app.globalData.SID = SID;
      app.globalData.u_id = this.data.u_id;
      return;
    } else { // 不存在SID或SID已经过期 那么需要登录
      this._login(); // 登录成功后要拉取数据
      return;
    }
  },
  _fetchTaskFlows: function () {
    this.fetchTaskFlows(this.data.u_id, this.setTfIds)
  },
  _login: function () {
    const that = this;
    wx.login({
      success: function (res) {
        console.log(res)
        that.login(res.code, that._fetchTaskFlows);
      },
      fail: function (err) {
        console.log(err);
      }
    })
  },
  getUserInfoFromStorage: function () {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      console.log("get ", userInfo);
      this.setData({
        userInfo,
        hasUserInfo: true
      })
    }
  },
  setTfIds: function () {
    const { taskFlowList } = this.data;
    const tf_ids = taskFlowList.map(tf => tf.id);
    app.globalData.tf_ids = tf_ids;
  },
  //事件处理函数
  onLoad: function (options) {
    this.checkSID();
    this.getUserInfoFromStorage();
    const SID = wx.getStorageSync('SID');
    const u_id = wx.getStorageSync('u_id');
    if (!u_id) {
      this.setData({
        showAuthModal: true
      });
      wx.hideTabBar({});
    }
    if (SID) {
      this.fetchTaskFlows(u_id, this.setTfIds);
      const settings = wx.getStorageSync('settings') || {};
      const isPinTop = settings.isPinTop;
      isPinTop && this.getPinTopTaskFlow();
    }
    console.log("globalData=>", app.globalData);
  },
  onShow: function (e) {
    this.setData({
      searchKeyword: '',
      searchResultList: [],
      filterTaskFlowList: [],
      filter: false,
      filterItems: initFilterItems
    })
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this.fetchTaskFlows(this.data.u_id, this.setTfIds);
    this.getPinTopTaskFlow();
    wx.stopPullDownRefresh();
  }
};

const getCategory = (task_flows) => {
  const cats = ['']; // 兼容返回按钮
  for (let i = 0; i < task_flows.length; i++) {
    const { category } = task_flows[i];
    if (!cats.includes(category))
      cats.push(category);
  }
  return cats;
}
const mapStateToData = (state, options) => {
  const ids = { ...state.ids };
  const entities = { ...state.entities };
  const inPinTopList = function (tf_id) {
    const pinTopList = state.pinTopList;
    return (Array.isArray(pinTopList) && pinTopList.includes(tf_id))
  }
  const wrapTaskFlow = item => {
    const { members } = item;
    let _item = { ...item };
    _item.members = members.map(mid => entities.members[mid]);
    return _item;
  }
  const settings = { ...state.settings };
  const isPinTop = settings.isPinTop;

  // 组装一个完整的tf列表
  const _taskFlowList = ids.task_flows.map(id => entities.task_flows[id]);
  const allTaskFlowList = _taskFlowList.map(wrapTaskFlow);
  console.log("allTaskFlowList=>", allTaskFlowList);

  let taskFlowList = [];
  let pinTopTaskFlowList = [];

  if (isPinTop) {
    const pinTopIds = ids.task_flows.filter(inPinTopList);
    const pinTopTFs = pinTopIds.map(id => ({ ...entities.task_flows[id] }));
    pinTopTaskFlowList = pinTopTFs.map(wrapTaskFlow);
    const pinIds = pinTopTaskFlowList.map(ptf => ptf.id);
    taskFlowList = allTaskFlowList.filter(tf => {
      if (pinIds.includes(tf.id)) return false;
      else return true;
    }); // 筛选出不是置顶的tf
    console.log("taskFlowList", taskFlowList)
  } else {
    taskFlowList = allTaskFlowList;
  }

  const categories = getCategory(taskFlowList);
  app.globalData.categories = categories.slice(1, categories.length); // 将分类存到全局变量中
  return {
    taskFlowList,
    u_id: wx.getStorageSync('u_id') || "no_user_id",
    auth: state.auth.authenticated,
    pinTopTaskFlowList,
    categories,
    isPinTop
  };
}
const mapDispatchToPage = dispatch => ({
  login: (code, callback) => dispatch(login(code, callback)),
  fetchUsers: () => dispatch(fetchUsers()),
  fetchTasks: taskFlowId => dispatch(fetchTasks(taskFlowId)),
  fetchTaskFlows: (uid, callback) => dispatch(fetchTaskFlows(uid, callback)),
  gotUserInfo: (u_id, userInfo) => dispatch(gotUserInfo(u_id, userInfo)),
  getPinTopTaskFlow: () => dispatch(getPinTopTaskFlow()),
  pinTopTaskFlow: tf_id => dispatch(pinTopTaskFlow(tf_id)),
  cancelPinTopTaskFlow: tf_id => dispatch(cancelPinTopTaskFlow(tf_id))
})
const _page = connect(mapStateToData, mapDispatchToPage)(page);
Page(_page);
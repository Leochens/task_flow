//index.js
import {
  connect
} from '../../libs/wechat-weapp-redux';
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime';
const MENU = {
  NONE: 0,
  CLASSIFY: "1",
  COMPLETED: "2",
  DELETE: "3"
}
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
    canIUse:wx.canIUse('button.open-type.getUserInfo'),
    isClassify: false,
    isFilter: MENU.NONE,
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
    searchKeyword: '',
    tfCardType: 'default',
    hasUserInfo:false
  },
  onSearch: function (e) {
    const keyword = e.detail;
    console.log(keyword);
    const { taskFlowList } = this.data;
    const searchResultList = taskFlowList.filter(tf => tf.tf_name.indexOf(keyword) > -1 || tf.tf_describe.indexOf(keyword) > -1);
    const len = searchResultList.length;
    wx.showToast({
      title: len ? `找到${len}条` : "未找到"
    })
    this.setData({
      searchResultList,
      searchKeyword: keyword
    })
  },
  clearSearch: function () {
    this.setData({
      searchResultList: []
    })
  },
  onDeleteTaskFlow: function (e) {
    console.log("fff", e);
    const tf_id = e.currentTarget.dataset.tfid;

    const tf = this.data.taskFlowList.filter(tf => tf.id === tf_id)[0];
    if (!tf.is_completed) {
      wx.showModal({
        title: "删除失败",
        content: `想要删除任务流"${tf.tf_name}"您必须先结束它`
      });
      return;
    }
    wx.showModal({
      title: "删除提醒",
      content: `您确定删除任务流"${tf.tf_name}"吗`,
      success: function (e) {
        console.log("确定")
      },
      completed: function () {
      }
    });
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
  },
  pinTopTf: function (e) {
    const tf_id = e.currentTarget.dataset.tfid;
    this.pinTopTaskFlow(tf_id);
  },
  cancelPinTopTf: function (e) {
    const tf_id = e.currentTarget.dataset.tfid;
    this.cancelPinTopTaskFlow(tf_id);
  },
  menuTabSelect(e) {
    const which = e.currentTarget.dataset.id;
    let tfCardType = 'default';
    switch (which) {
      case MENU.COMPLETED:
        {

          console.log("切换已完成");
          this.setData({
            isFilter: this.data.isFilter ? MENU.NONE : MENU.COMPLETED,
            filterTaskFlowList: this.data.taskFlowList.filter(item => item.is_completed),
          });
          break;
        }
      case MENU.DELETE: {
        tfCardType = this.data.tfCardType === 'delete' ? 'default' : 'delete'
        break;
      }
      default: break;
    }
    this.setData({
      TabCur: which,
      scrollLeft: (which - 1) * 60,
      isClassify: which == 1 ? true : false,
      tfCardType
    })
  },
  classTabSelect(e) { // 按照分类筛选tf
    console.log(e.currentTarget.dataset);
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
    if (this.endTime - this.startTime >= 350 || this.data.tfCardType != 'default') return;
    const tf_id = e.target.dataset.tfid;
    wx.navigateTo({
      url: '../task_flow/task_flow?tf_id=' + tf_id
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
      this._login();
      this.fetchTaskFlows(this.data.u_id)
      return;
    }
  },
  _login: function () {
    const that = this;
    wx.login({
      success: function (res) {
        console.log(res)
        that.login(res.code);
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
        hasUserInfo:true
      })
    }
  },
  //事件处理函数
  onLoad: function () {
    this.checkSID();
    this.getUserInfoFromStorage();
    const SID = wx.getStorageSync('SID');
    if (SID) {
      this.fetchTaskFlows(this.data.u_id);
      this.getPinTopTaskFlow();
    }
  },
  onShow: function (e) {
    console.log(e);
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this.fetchTaskFlows(this.data.u_id);
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
    const { members, tasks } = item;
    let _item = { ...item };
    _item.members = members.map(mid => entities.members[mid]);
    _item.tasks = tasks.map(tid => entities.tasks[tid]);
    _item.tasks = _item.tasks.map(t => {
      const _t = { ...t };
      const memIds = _t.members;
      const mems = memIds.map(mid => entities.members[mid]);
      _t.members = mems;
      return _t;
    })
    return _item;
  }
  const pinTopIds = ids.task_flows.filter(inPinTopList);
  // 组装一个完整的tf列表
  const _taskFlowList = ids.task_flows.map(id => entities.task_flows[id]);
  const pinTopTFs = pinTopIds.map(id => entities.task_flows[id]);
  const taskFlowList = _taskFlowList.map(wrapTaskFlow);
  const pinTopTaskFlowList = pinTopTFs.map(wrapTaskFlow);
  const categories = getCategory(taskFlowList);
  return {
    taskFlowList,
    u_id: wx.getStorageSync('u_id') || "no_user_id",
    auth: state.auth.authenticated,
    pinTopTaskFlowList,
    categories
  };
}
const mapDispatchToPage = dispatch => ({
  login: code => dispatch(login(code)),
  fetchUsers: () => dispatch(fetchUsers()),
  fetchTasks: taskFlowId => dispatch(fetchTasks(taskFlowId)),
  fetchTaskFlows: uid => dispatch(fetchTaskFlows(uid)),
  gotUserInfo: (u_id, userInfo) => dispatch(gotUserInfo(u_id, userInfo)),
  getPinTopTaskFlow: () => dispatch(getPinTopTaskFlow()),
  pinTopTaskFlow: tf_id => dispatch(pinTopTaskFlow(tf_id)),
  cancelPinTopTaskFlow: tf_id => dispatch(cancelPinTopTaskFlow(tf_id))
})
const _page = connect(mapStateToData, mapDispatchToPage)(page);
Page(_page);
//index.js
import {
  connect
} from '../../libs/wechat-weapp-redux';
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime';
const MENU = {
  NONE: 0,
  CLASSIFY: "1",
  FAVOR: "2",
  COMPLETED: "3"
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
    isClassify: false,
    isFilter: MENU.NONE,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    TabCur: 1,
    scrollLeft: 0,
    height: app.globalData.height * 6,
    filterTaskFlowList: [],
    taskFlowList: [],
    pinTopTaskFlowList: [],
    searchResultList: [],
    searchKeyword: ''
  },
  onSearch: function (e) {
    const keyword = e.detail;
    console.log(keyword);
    const { taskFlowList } = this.data;
    const searchResultList = taskFlowList.filter(tf => tf.tf_name.indexOf(keyword) > -1 || tf.tf_describe.indexOf(keyword) > -1);
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
    console.log(which);
    switch (which) {
      case MENU.COMPLETED:
        {

          console.log("切换已完成");
          this.setData({
            isFilter: this.data.isFilter ? MENU.NONE : MENU.COMPLETED,
            filterTaskFlowList: this.data.taskFlowList.filter(item => item.is_completed)
          });
          break;
        }
      case MENU.FAVOR:
        {
          console.log("切换星标");
          this.setData({
            isFilter: this.data.isFilter ? MENU.NONE : MENU.FAVOR,
            filterTaskFlowList: this.data.taskFlowList.filter(item => item.is_completed)
          });
          break;
        }
      default:
        {
          console.log("???")
        }
    }
    this.setData({
      TabCur: which,
      scrollLeft: (which - 1) * 60,
      isClassify: which == 1 ? true : false
    })
  },
  classTabSelect(e) {
    console.log(e.currentTarget.dataset);
    const which = e.currentTarget.dataset.id;

    this.setData({
      TabCur: which,
      scrollLeft: (which - 1) * 60,
      isClassify: which == 0 ? false : true
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
  addNewTaskFlow: function () {
    wx.navigateTo({
      url: '../create_task_flow/create_task_flow'
    })
  },
  //用户点击tab时调用
  titleClick: function (e) {
    let currentPageIndex =
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
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
        hasUserInfo: true
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
    console.log("执行index的onLoad")
    // this._login(); //此处为测试 使得每次刷新都会登录 记得改回上面的checkSID


  },
  onShow: function (e) {
    console.log(e);
    // this.onPullDownRefresh();

  },
  // 用户分享
  onShareAppMessage: function (res) {
    return {
      title: '任务流邀请',
      path: '/pages/test/test?taskID=t000223',
      success: function (res) {
        console.log("suc", res);
      },
      fail: function (res) {
        console.log("fai", res);

      }
    }
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this.fetchTaskFlows(this.data.u_id)

    wx.stopPullDownRefresh();
  }
};

const getCategory = (task_flows) => {
  const cats = ['']; // 兼容返回按钮
  for(let i = 0;i<task_flows.length;i++){
    const { category } = task_flows[i];
    if(!cats.includes(category)) 
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
  const categories = getCategory(taskFlowList);
  const pinTopTaskFlowList = pinTopTFs.map(wrapTaskFlow);
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
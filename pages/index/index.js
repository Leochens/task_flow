//index.js
import {
  connect
} from '../../libs/wechat-weapp-redux';
const MENU = {
  NONE: 0,
  CLASSIFY: "1",
  FAVOR: "2",
  COMPLETED: "3"
}
import {
  fetchUsers,
  fetchTasks,
  fetchTaskFlows
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
    taskFlowList: []
  },

  getUserInfo: function(e) {
    console.log(e)
    if(!e.detail.userInfo){
      console.log("用户拒绝授权");
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
  toTaskFlowDetail: function(e) {
    // console.log(e);
    const tf_id = e.target.dataset.tfid;
    const tf=this.data.taskFlowList.filter(tf=>tf.id === tf_id)[0];
    wx.navigateTo({
      url: '../task_flow/task_flow?tf='+JSON.stringify(tf),
      
      success: function(res) {
        console.log(res);
      },
      fail: function(err) {
        console.log(err);
      }
    })
  },
  addNewTaskFlow: function() {
    wx.navigateTo({
      url: '../create_task_flow/create_task_flow'
    })
  },
  //用户点击tab时调用
  titleClick: function(e) {
    let currentPageIndex =
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      })
  },
  getSetting: function() {
    const that = this;
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          that.setData({
            hasAuth: true
          })
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          that.setData({
            hasAuth: false
          })
        }
      }
    })
  },
  onShow: function() {
    console.log(this.data)

  },
  // 检测SID是否过期 过期后要重新登录
  checkSID: function() {
    const SID = wx.getStorageSync('SID');
    const SID_EXPIRATION = wx.getStorageSync('SID_EXPIRATION')
    const now = Date.parse(new Date());
    if (SID && SID_EXPIRATION > now) { //存在SID并且没有过期
      console.log("存在SID并且没有过期", SID,now);
      return;
    } else { // 不存在SID或SID已经过期 那么需要登录
      this._login();
      return;
    }
  },
  _login: function() {
    const that = this;
    wx.login({
      success: function(res) {
        console.log(res)
        that.login(res.code);
      },
      fail: function(err) {
        console.log(err);
      }
    })
  },
  getUserInfoFromStorage: function(){
    const userInfo = wx.getStorageSync('userInfo');
    if(userInfo){
      console.log("get ",userInfo);
      this.setData({
        userInfo,
        hasUserInfo:true
      })
    }

  },
  //事件处理函数
  onLoad: function() {
    this.checkSID(); 
    this.getUserInfoFromStorage();
    // this._login(); //此处为测试 使得每次刷新都会登录 记得改回上面的checkSID
    // this.fetchUsers();
    this.fetchTaskFlows(this.data.u_id)

  },
  // 用户分享
  onShareAppMessage: function(res) {
    return {
      title: '任务流邀请',
      path: '/pages/test/test?taskID=t000223',
      success: function(res) {
        console.log("suc", res);
      },
      fail: function(res) {
        console.log("fai", res);

      }
    }
  }
};

const mapStateToData = (state, options) => {
  const ids = {...state.ids};
  const entities = {...state.entities};
  // 组装一个完整的tf列表
  const _taskFlowList = ids.task_flows.map(id=>entities.task_flows[id]);
  const taskFlowList = _taskFlowList.map(item=>{
    const {members,tasks} = item;
    let _item = {...item};
    _item.members = members.map(mid=>entities.members[mid]);
    _item.tasks = tasks.map(tid=>entities.tasks[tid]);
    _item.tasks = _item.tasks.map(t=>{
      const _t = {...t};
      const memIds = _t.members; 
      const mems = memIds.map(mid => entities.members[mid]);
      _t.members = mems;
      return _t;
    })
    console.log(_item);
    return _item;
  });
  return {
    taskFlowList,
    u_id: wx.getStorageSync('u_id')
  };
}
const mapDispatchToPage = dispatch => ({
  login: code => dispatch(login(code)),
  fetchUsers: () => dispatch(fetchUsers()),
  fetchTasks: taskFlowId => dispatch(fetchTasks(taskFlowId)),
  fetchTaskFlows: uid => dispatch(fetchTaskFlows(uid)),
  gotUserInfo: (u_id, userInfo) => dispatch(gotUserInfo(u_id, userInfo))
})
const _page = connect(mapStateToData, mapDispatchToPage)(page);
Page(_page);
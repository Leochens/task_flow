//index.js
import {
  bindActionCreators
} from '../../libs/redux';
import {
  connect
} from '../../libs/wechat-weapp-redux';
const MENU = {
  NONE: 0,
  CLASSIFY: "1",
  FAVOR: "2",
  COMPLETED: "3"
}
//获取应用实例
const app = getApp()
const page = {
  data: {
    isLogin: false,
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
    taskFlowList: [{
      "taskID": "000239",
      "taskName": "情人节活动",
      "leader": {
        "openID": "fjhegfakdbajksbfsjfhsvfafs",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
        "city": "Baoding",
        "country": "China",
        "gender": 1,
        "language": "zh_CN",
        "nickName": "Ryan Hardy",
        "province": "Hebei",
        "phoneNumber": "18332518328"
      },
      "describe": "情人节就要到了，公司准备举办一个情人节活动，具体包括给公司的情侣送花…",
      "isCompleted": true,
      "beginDate": "2019.2.5",
      "endDate": "2019.2.16",
      "members": {
        "sfafebge": "sfafebge",
        "yawgfueferg": "sfafebge",
        "112234": "sfafebge"
      }
    }]
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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
            filterTaskFlowList: this.data.taskFlowList.filter(item => item.isCompleted)
          });
          break;
        }
      case MENU.FAVOR:
        {
          console.log("切换星标");
          this.setData({
            isFilter: this.data.isFilter ? MENU.NONE : MENU.FAVOR,
            filterTaskFlowList: this.data.taskFlowList.filter(item => item.isCompleted)
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
  toTaskFlowDetail: function() {
    wx.navigateTo({
      url: '../task_flow/task_flow',
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
  //事件处理函数
  onLoad: function() {
    // this.getSetting();
    // const hasAuth = wx.getStorageSync("HASAUTH");
    // console.log(hasAuth);
    // this.setData({
    //   hasAuth
    // });
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
  return {

  };
}
const mapDispatchToPage = dispatch => ({

})
const _page = connect(mapStateToData, mapDispatchToPage)(page);
Page(_page);
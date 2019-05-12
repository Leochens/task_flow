// pages/message/message.js
import { connect } from '../../libs/wechat-weapp-redux';
import {
  fetchMessages,
  setMessageRead
} from '../../actions/index';
import { dynamicDate, formatTime } from '../../utils/util';
const app = getApp();

const page = {

  /**
   * 页面的初始数据
   */
  data: {
    messages: []
  },


  setRead: function (u_id) {
    this.setMessageRead(u_id);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const u_id = app.globalData.u_id;
    this.fetchMessages(u_id);
  },
  refresh:function(){
    const u_id = app.globalData.u_id;
    this.fetchMessages(u_id);
    wx.showToast({
      title: '刷新中..',
    })
  },
  onShow: function () {

  },
  onPullDownRefresh: function () {
    const u_id = wx.getStorageSync('u_id');
    wx.showNavigationBarLoading();
    this.fetchMessages(u_id);
    wx.stopPullDownRefresh();
  },
  onHide: function () {
    const u_id = wx.getStorageSync('u_id');
    this.setRead(u_id);
  },
  clearMsg: function () {
    const that = this;
    wx.showModal({
      title: "三思后行",
      content: "确认清空全部消息记录吗",
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          //点击确定
          wx.setStorageSync('messages_entities', {});
          wx.setStorageSync('messages_ids', []);
          that.onPullDownRefresh();
        }
      },
      fail: function (res) { },//接口调用失败的回调函数
      complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
    })

  }
}

const mapStateToData = state => {
  const intellectDatetime = state.settings.intellectDatetime;

  const m_ids = [...state.ids.messages];
  const _messages = { ...state.entities.messages };
  const messages = m_ids.map(m_id => {
    const msg = { ..._messages[m_id] };
    if (msg.tf_end_time) {
      msg.tf_end_time = formatTime(new Date(msg.tf_end_time));
    }
    if (msg.t_end_time) {
      msg.t_end_time = formatTime(new Date(msg.t_end_time));
    }
    return msg;
  }
  );
  const sortby = (t1, t2) => {
    return t2.create_time > t1.create_time ? 1 : -1;
  }
  messages.sort(sortby);

  if (intellectDatetime) {
    messages.forEach(m => {
      m.d_create_time = dynamicDate(m.create_time);
    })
  }

  return {
    messages,
    intellectDatetime
  }
}
const mapDispatchToPage = dispatch => {
  return {
    fetchMessages: u_id => dispatch(fetchMessages(u_id)),
    setMessageRead: u_id => dispatch(setMessageRead(u_id))
  }
}

const _page = connect(mapStateToData, mapDispatchToPage)(page);
Page(_page)


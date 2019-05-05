// pages/review/review.js
import {
  connect
} from '../../libs/wechat-weapp-redux';
const app = getApp()
import { fetchReviewList, allowTakeBreak, refuseTakeBreak } from '../../actions/index';

const page = {

  /**
   * 页面的初始数据
   */
  data: {
    reason: '其他原因',
    hideModal: true,
    curTid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const u_id = this.data.u_id;
    this.fetchReviewList(u_id);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  inputRefuseReason: function (e) {
    // console.log(e);
    const reason = e.detail.value;
    this.setData({
      reason
    })
  },
  cancelM: function () {
    this.setData({
      hideModal: true,
      reason: ''
    })
  },
  confirmM: function () { // 发送拒绝请求
    const {reason,curTid,u_id} = this.data;
    this.refuseTakeBreak(curTid,u_id,reason); // api
    this.setData({
      hideModal: true,
      reason: ''
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    const u_id = this.data.u_id;
    this.fetchReviewList(u_id);
    wx.stopPullDownRefresh();
  },
  allow: function (e) {
    console.log(e);
    const t_id = e.currentTarget.dataset.tid;
    this.allowTakeBreak(t_id, this.data.u_id);
  },
  reject: function (e) {
    const t_id = e.currentTarget.dataset.tid;
    this.setData({
      curTid: t_id,
      hideModal: false
    })
  }
}


const mapStateToData = (state) => {

  return {
    u_id: wx.getStorageSync('u_id') || "no_user_id",
    reviews: state.reviews
  };
}
const mapDispatchToPage = dispatch => ({
  fetchReviewList: u_id => dispatch(fetchReviewList(u_id)),
  allowTakeBreak: (t_id, u_id) => dispatch(allowTakeBreak(t_id, u_id)),
  refuseTakeBreak: (t_id, u_id,refuse_reason) => dispatch(refuseTakeBreak(t_id, u_id,refuse_reason))
})
const _page = connect(mapStateToData, mapDispatchToPage)(page);
Page(_page);
// pages/review/review.js
import {
  connect
} from '../../libs/wechat-weapp-redux';
const app = getApp()
import { fetchReviewList, allowTakeBreak, refuseTakeBreak } from '../../actions/index';
import replaceChar from '../../utils/replaceChar';
import { recordOperation, TYPE } from '../../actions/record';

const page = {

  /**
   * 页面的初始数据
   */
  data: {
    reason: '其他原因',
    hideModal: true,
    curTid: '',
    reviews: [],
    apply_user_id: ''
  },
  onLoad: function (options) {
    const u_id = this.data.u_id;
    this.fetchReviewList(u_id);
  },
  onShow: function () {

  },
  toDetail: function (e) {
    const t_id = e.currentTarget.dataset.tid;
    wx.navigateTo({
      url: '../task/task?t_id=' + t_id
    })
  },
  inputRefuseReason: function (e) {
    // console.log(e);
    const reason = e.detail.value;
    this.setData({
      reason
    })
  },
  clear: function () {
    this.setData({
      hideModal: true,
      reason: '',
      apply_user_id: ''
    })
  },
  cancelM: function () {
    this.clear();
  },
  confirmM: function () { // 发送拒绝请求
    const { reason, curTid, u_id, apply_user_id } = this.data;

    if (replaceChar(reason) === '') return wx.showToast({ title: '拒绝原因不能为空' });
    this.refuseTakeBreak(curTid, u_id, apply_user_id, reason || '无理由'); // api
    this.clear();
    this.onPullDownRefresh();
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
    const r_id = e.currentTarget.dataset.rid;
    const review = this.data.reviews[r_id]
    const { t_id, apply_user_id } = review;
    this.allowTakeBreak(t_id, this.data.u_id, apply_user_id);
    this.recordOperation(`同意子任务[${review.t_name}]成员[${review.apply_user_name}]的请假`, TYPE.UPDATE)

    this.clear();
    this.onPullDownRefresh();
  },
  reject: function (e) {
    const r_id = e.currentTarget.dataset.rid;
    const review = this.data.reviews[r_id]
    const { t_id, apply_user_id } = review;
    this.recordOperation(`拒绝子任务[${review.t_name}]成员[${review.apply_user_name}]的请假`, TYPE.UPDATE)

    this.setData({
      curTid: t_id,
      hideModal: false,
      apply_user_id
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
  allowTakeBreak: (t_id, u_id, apply_user_id) => dispatch(allowTakeBreak(t_id, u_id, apply_user_id)),
  refuseTakeBreak: (t_id, u_id, apply_user_id, refuse_reason) => dispatch(refuseTakeBreak(t_id, u_id, apply_user_id, refuse_reason)),
  recordOperation: (msg, op_type) => dispatch(recordOperation(msg, op_type))

})
const _page = connect(mapStateToData, mapDispatchToPage)(page);
Page(_page);
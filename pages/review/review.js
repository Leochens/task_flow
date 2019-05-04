// pages/review/review.js
import {
  connect
} from '../../libs/wechat-weapp-redux';
const app = getApp()
import { fetchReviewList } from '../../actions/index';

const page = {

  /**
   * 页面的初始数据
   */
  data: {

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


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  }
}


const mapStateToData = (state) => {

  return {
    u_id: wx.getStorageSync('u_id') || "no_user_id",
    reviews: state.reviews
  };
}
const mapDispatchToPage = dispatch => ({
  fetchReviewList: u_id => dispatch(fetchReviewList(u_id))
})
const _page = connect(mapStateToData, mapDispatchToPage)(page);
Page(_page);
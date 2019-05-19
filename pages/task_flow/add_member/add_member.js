// pages/task_flow/add_member/add_member.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tf_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { tf_id, who, tf_name, cnt, avatar } = options;
    this.setData({
      tf_id,
      who,
      tf_name,
      cnt,
      avatar
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    console.log(e);
    wx.showShareMenu({
      withShareTicket: true
    });


    return {
      title: '任务流邀请',//分享内容
      path: '/pages/invite/invite?tf_id=' + this.data.tf_id + "&who=" + this.data.who + "&tf_name=" + this.data.tf_name + "&cnt=" + this.data.cnt + "&avatar=" + this.data.avatar,//分享地址
    }

  }

})
// pages/task_flow/all_members/all_members.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tf_id:'',
    members:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const tf_id = options.tf_id;
    const members = JSON.parse(options.members);
    this.setData({
      tf_id,
      members
    })
  }
})
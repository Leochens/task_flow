// pages/task_flow/task_flow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskList: [{
      date: "2019.2.5",
      taskName: "去市场采购玫瑰花",
      execPeople: ["张小三", "李大四"],
      status: true,
      deadlineTime: "22:30",
      detail: "张小三和李大四，在13日下午去公司附近的花鸟鱼虫市场采购情人节当天要用的玫瑰花，采购完成后放到公司大厅。记得留存发票。"
    },
    {
      date: "2019.2.15",
      taskName: "去市场采购玫瑰花",
      execPeople: ["张小三", "李大四","王五"],
      status: false,
      deadlineTime: "22:30",
      detail: "张小三和李大四，在13日下午去公司附近的花鸟鱼虫市场采购情人节当天要用的玫瑰花，采购完成后放到公司大厅。记得留存发票。"
    },
    {
      date: "2019.2.5",
      taskName: "去市场采购玫瑰花",
      execPeople: ["张小三", "李大四"],
      status: true,
      deadlineTime: "22:30",
      detail: "张小三和李大四，在13日下午去公司附近的花鸟鱼虫市场采购情人节当天要用的玫瑰花，采购完成后放到公司大厅。记得留存发票。"
    },
    {
      date: "2019.2.5",
      taskName: "去市场采购玫瑰花",
      execPeople: ["张小三", "李大四"],
      status: false,
      deadlineTime: "22:30",
      detail: "张小三和李大四，在13日下午去公司附近的花鸟鱼虫市场采购情人节当天要用的玫瑰花，采购完成后放到公司大厅。记得留存发票。"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    wx.hideTabBar({});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
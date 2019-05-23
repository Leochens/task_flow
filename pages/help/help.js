// pages/help/help.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  toFreshHelp: function () {
    wx.navigateTo({
      url: './fresh_help/fresh_help'
    })
  }
})
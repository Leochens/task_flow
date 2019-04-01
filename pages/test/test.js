// pages/test/test.js
const url = "http://api.mokis.top:8899";
// const redux = require('redux');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  onGetV:function(e){
    console.log(e.detail);
    this.setData({
      dateTime: e.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

})
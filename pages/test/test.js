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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("test 参数=>", options);
    console.log(getApp().globalData);
    this.setData({
      str: 'hahaha',
      taskID: options.taskID || ""
    });

  },

  onSubmit: function(event) {
    const {
      detail: {
        formId
      }
    } = event;
    console.log(formId);
    this.setData({
      formId
    })
    const d = {
      "keyword1": {
        "value": "情人节活动",
        "color": "#000"
      },
      "keyword2": {
        "value": "RyanHardy",
        "color": "#6a51cc"
      },
      "keyword3": {
        "value": "请点击卡片选择是否接受任务哦",
        "color": "#000"
      },
      "keyword4": {
        "value": "任务名称任务名...",
        "color": "#000"
      },
      "keyword5": {
        "value": "",
        "color": "#000"
      },
      "keyword6": {
        "value": "",
        "color": "#000"
      }
    }

    wx.cloud.callFunction({
      name: 'getToken',
      success: function(res) {
        console.log("token==>", res.result);
        wx.request({
          url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + res.result.access_token,
          method: 'POST',
          data: {
            data: d,
            touser: 'okulZ5LTxceX9Oq_nQL4Nfg_wUDM',
            // touser: 'okulZ5Ov2fFeFZKPRjdUK-ZsGXPo',
            template_id: '2yp1OS5xu86ZF0OKi2UtbKGdAXc1flIxkMBKZ8MKo1Y', //申请的模板消息id，  
            page: 'pages/logs/logs',
            form_id: formId,
            color: '#ccc',
            emphasis_keyword: 'keyword1.DATA'
          },
          success: function(res) {
            console.log("模板消息发送成功", res);
          },
          fail: function(res) {
            console.log("模板消息发送失败", res);
          }
        })
      },
      fail: function(err) {
        console.log(err);
      }
    });

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  info: function() {
    const that = this;

    wx.getUserInfo({
      success: function(res) {
        console.log(res);
        const city = res.userInfo.city;
        const avatar = res.userInfo.avatarUrl;
        const gender = res.userInfo.gender;
        const nickName = res.userInfo.nickName;
        const province = res.userInfo.province;
        that.setData({
          city,
          avatar,
          gender,
          nickName,
          province
        });
      }
    })
  }
})
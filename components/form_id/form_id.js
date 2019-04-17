// components/form_id/form_id.js
import appConfig from '../../appConfig'
const apiBaseUrl = appConfig.apiBaseUrl;
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    formSubmit: function (e) {
      console.log(e.detail.formId);
      const formid = e.detail.formId;
      wx.request({
        method: "POST",
        url: apiBaseUrl + '/formid',
        data: JSON.stringify({ formid: formid }),
        success: function (res) {
          console.log(res);
        },
        fail: function (err) {
          console.log(err);
        }
      })
    }
  }
})
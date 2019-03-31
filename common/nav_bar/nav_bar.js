// common/nav_bar/nav_bar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String
    },
    onBack: {
      type: Function,
      value: ()=>{console.log("hello?");wx.navigateBack()}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    back: function(){
      console.log("back")
      this.properties.onBack();
    }
  }
})

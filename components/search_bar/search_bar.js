// components/search_bar/search_bar.js
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
    keyword: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onkeywordChange: function(e){
      // console.log(e);
      const keyword = e.detail.value;
      this.setData({
        keyword
      })
    },
    onSubmit: function (e) {
      // console.log(e);
      const { keyword }= this.data;
      this.triggerEvent('onSearch', keyword);
      this.setData({
        keyword: '',
      })
    },
  }
})

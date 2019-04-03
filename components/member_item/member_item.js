// components/member_item/member_item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      avatarUrl:{
        type: String
      },
      nickName:{
        type: String
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isSelected: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggleSelect:function(e) {

        this.setData({
          isSelected:!this.data.isSelected
        })
    }
  }
})

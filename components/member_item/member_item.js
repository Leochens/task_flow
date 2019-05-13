// components/member_item/member_item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    avatarUrl: {
      type: String
    },
    nickName: {
      type: String
    },
    isSelected: {
      type: Boolean
    },
    disableSelect: {
      type: Boolean
    },
    isLeader: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    flag: false
  },
  ready: function () {
    this.setData({
      flag: this.properties.isSelected ? true : false
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    toggleSelect: function (e) {
      if (this.data.disableSelect) return;
      this.setData({
        flag: !this.data.flag
      });
    }
  }
})

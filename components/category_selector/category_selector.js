// components/category_selector/category_selector.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isActive: Boolean,
    curCate: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    categories: [],
    showAddModal: false,
    newCateName: '',
    curIndex: -1
  },
  ready: function () {
    const { categories } = app.globalData;
    const { curCate } = this.properties;
    const curIndex = categories.indexOf(curCate);
    this.setData({
      categories,
      curIndex
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    clear: function () {
      this.setData({
        showAddModal: false,
        newCateName: '',
        curIndex: -1
      })
    },
    bindPickerChange: function (e) {
      const index = e.detail.value;
      this.setData({
        curIndex: index,
        newCateName: this.data.categories[index]
      })
    },
    inputCategory: function (e) {
      const name = e.detail.value;
      if (typeof name === 'string' && name.trim() != '') {
        this.setData({
          newCateName: name
        })
      }
    },
    addCate: function () {   // 显示添加分类的对话框
      this.setData({
        showAddModal: true
      })
    },
    selectCancel: function () {
      // 触发父级取消事件
      this.triggerEvent('onCancel');
      this.clear();
    },
    selectConfirm: function () {
      // 
      this.selectCategoryComplete();
      this.clear();
    },
    addCancel: function () {
      this.setData({ showAddModal: false });
      this.clear();

    },
    addConfirm: function () {
      this.selectCategoryComplete();
      this.setData({ showAddModal: false });
      this.clear();
    },
    selectCategoryComplete: function () {
      const { newCateName } = this.data;
      // 触发父级选择成功事件
      console.log("选择成功", newCateName);
      this.triggerEvent('onSelect', { newCateName });
      // this.clear();

    }
  }
})

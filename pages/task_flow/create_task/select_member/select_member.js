// pages/task_flow/create_task/select_member/select_member.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    members:[],
    currentSelected:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    const members = JSON.parse(options.members);
    console.log(members);
    this.setData({
      members
    });
  },
  selectMember:function(e){
      console.log(e);
      const uid = e.target.dataset.uid;
      // 每点击一次就执行放入|移除操作 点击完成的时候就是要选择的人员集合
      this._toggleSelectMember(uid);

  },
  _toggleSelectMember: function(uid){
      const currentSelected = this.data.currentSelected.slice();
      if(!Array.isArray(currentSelected) ||typeof uid != 'string') return;
      if(currentSelected.includes(uid)){ // 有就删除
        currentSelected.splice(currentSelected.indexOf(uid),1);
      }else{  // 没有就添加
        currentSelected.push(uid);
      }
      this.setData({
        currentSelected
      })

  },
  onSelectCompleted: function(){
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const prevPage = pages[pages.length - 2];
    // 向上一页赋值
    prevPage.setData({
      selectedMembers: this.data.currentSelected
    });
    wx.navigateBack();
  }

  
})
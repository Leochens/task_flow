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
    const selected_members = JSON.parse(options.selected_members);
    console.log(members);
    members.forEach(mem=>{
      if(selected_members.includes(mem.id)){
        mem.is_selected = true;
      }
    })
    this.setData({
      members,
      currentSelected:selected_members
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
    const {members,currentSelected} = this.data;
    const pages = getCurrentPages();

    const currentPage = pages[pages.length - 1];
    const prevPage = pages[pages.length - 2];
    const _selectedMembers =members.filter(mem=>currentSelected.includes(mem.id));
    const selectedMembers = _selectedMembers.map(mem=>mem.nick_name);
    // 向上一页赋值
    prevPage.setData({
      selectedMembersIds:currentSelected,
      selectedMembersNames: selectedMembers,
      selectedMembers:_selectedMembers
    });
    wx.navigateBack();
  }

  
})
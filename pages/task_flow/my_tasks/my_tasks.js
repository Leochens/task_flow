// pages/task_flow/my_tasks/my_tasks.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tf_id:'',
    tf_name:'',
    tasks:[],
    u_id: wx.getStorageSync('u_id'),
    u_name: wx.getStorageSync('userInfo').nickName,
    myTasks:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const tf_id = options.tf_id;
    const tasks = JSON.parse(options.tasks);
    const tf_name = options.tf_name
    this.setData({
      tf_id,
      tasks,
      tf_name
    })
  },
  _taskFilter: function(tf_id,u_id,tasks){
    return tasks.filter(task=>{
        const memberIds = task.members.map(mem=>mem.id);
        return (memberIds.includes(u_id)&&task.tf_id === tf_id)
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const {tf_id,tasks,u_id} = this.data;
    const myTasks = this._taskFilter(tf_id,u_id,tasks);
    console.log(myTasks);
    this.setData({
      myTasks
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
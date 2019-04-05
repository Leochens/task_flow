// pages/task_flow/task_flow.js
import {
  connect
} from '../../libs/wechat-weapp-redux';
const app = getApp();
import { compareDate } from '../../utils/util';
const page = {

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    tf_name: '',
    tf_describe: '',
    leader: {},
    is_completed: false,
    tasks: [],
    begin_time: '',
    end_time: '',
    category: '',
    members: [],
    CustomBar: app.globalData.CustomBar,
    ready: false,
    is_leader:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {

  },
  onLoad: function (options) {
    wx.hideTabBar({});

    const tf_id = options.tf_id;
    if (!tf_id) return;
    console.log(tf_id);
    const task_flow = this.data.getTaskFlow(tf_id);
    console.log(task_flow);
    const { tasks, id, tf_describe, tf_name, is_completed, begin_time, end_time, category, members, leader_id } = task_flow;
    const classfiedTasks = this.classifyTask(tasks);
    this.setData({
      id, tf_describe, tf_name, is_completed, begin_time, end_time, category, members,
      leader: members.filter(mem => mem.id === leader_id)[0],
      tasks: classfiedTasks,
      tf_id,
      ready:true,
      is_leader: wx.getStorageSync('u_id') === leader_id // 判断是否是leader
    });

  },
  classifyTask: function (t) {
    // 将子任务按照开始日期分类 同一天的放进一个数组里 还要排序 日期大类排序决定渲染顺序  
    if (!Array.isArray(t)) return;
    const tasks = t.slice();
    // 2019-3-20 12:34:21
    // const dateTimes = tasks.map(task=>task.begin_time);
    const sortby = (t1, t2) => {
      return compareDate(t1.begin_time, t2.begin_time);
    }
    tasks.sort(sortby);
    const splitDate = d => d.split(' ')[0];
    // 日期相同的抽出来放在一个集合里
    for (let i = 0; i < tasks.length; i++) {
      // 如果和上一个的日期一样 就不渲染dot 不一样就渲染dot
      if (i === 0) {
        tasks[i].renderDot = true;
        continue;
      };
      if (splitDate(tasks[i].begin_time) === splitDate(tasks[i - 1].begin_time)) {
        tasks[i].renderDot = false;
      } else tasks[i].renderDot = true;
    }
    console.log(tasks.map(task => task.renderDot));
    return tasks;
  },
  taskDetail: function (e) {
    console.log(e);
    const tid = e.currentTarget.dataset.tid;
    const task = this.data.tasks.filter(t => t.id === tid)[0];
    wx.navigateTo({
      url: '../task/task?task=' + JSON.stringify(task)
    })
  },
  // 加新的子任务
  addTask: function () {
    const { begin_time, end_time } = this.data;
    const time = {
      beginDate: begin_time,
      endDate: end_time
    }
    wx.navigateTo({
      url: './create_task/create_task?time=' + JSON.stringify(time) + "&tf_id=" + this.data.id + "&members=" + JSON.stringify(this.data.members),
    })
  },
  // 邀请新成员
  addMember: function () {
    wx.navigateTo({
      url: './add_member/add_member?tf_id=' + this.data.id + "&who=" + this.data.leader.nick_name + "&tf_name=" + this.data.tf_name + "&cnt=" + this.data.members.length + "&avatar=" + this.data.leader.avatar_url
    })
  },
  // 加入星标
  addFavor: function () {
    console.log("加入星标");
  },
  // 任务数据
  checkData: function () {
    wx.navigateTo({
      url: './task_flow_data/task_flow_data',
    })
  },
  my_tasks: function () {
    wx.navigateTo({
      url: './my_tasks/my_tasks',
    })
  },
  // 查看全部成员
  allMembers: function () {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  }
}

const mapStateToData = state => {
  const { task_flows, tasks: _tasks, members: _members } = state.entities;
  console.log("检测state是否变化", state);
  const getTaskFlow = function (tf_id) {
    const item = task_flows[tf_id];
    const { members, tasks } = item;

    let _item = { ...item };
    _item.members = members.map(mid => _members[mid]);
    _item.tasks = tasks.map(tid => _tasks[tid]);
    _item.tasks = _item.tasks.map(t => {
      const _t = { ...t };
      const memIds = _t.members;
      const mems = memIds.map(mid => _members[mid]);
      _t.members = mems;
      return _t;
    });
    return _item;
  }

  return {
    getTaskFlow
  }
}

const mapDispatchToPage = dispatch => {
  return {

  }
}
const _page = connect(mapStateToData, mapDispatchToPage)(page);
Page(_page)
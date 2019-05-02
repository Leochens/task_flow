// pages/task_flow/task_flow.js
import {
  connect
} from '../../libs/wechat-weapp-redux';
const app = getApp();
import {
  fetchTasks,
  updateTaskFlow
} from '../../actions/index'
import { compareDate, formatTime } from '../../utils/util';
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
    is_leader: false,
    ready: false,
    showModal: false,
    editable:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  /**
 * 生命周期函数--监听页面显示
 */
  editInfo: function () {
    wx.navigateTo({
      url: '../create_task_flow/create_task_flow?flag=update&tf_id=' + this.data.id + "&tf_name=" + this.data.tf_name + "&tf_describe=" + this.data.tf_describe + "&end_time=" + this.data.end_time+"&begin_time="+this.data.begin_time
    })
  },
  setFunc: function () {
    const tf_id = this.data.id;
    const task_flow = this.data.taskFlowList.filter(tf => tf.id === tf_id)[0];
    console.log(task_flow);
    const { tasks, id, tf_describe, tf_name, is_completed, begin_time, end_time, category, members, leader_id } = task_flow;
    const classfiedTasks = this.classifyTask(tasks);
    this.setData({
      id, tf_describe, tf_name, is_completed, begin_time, end_time, category, members,
      leader: members.filter(mem => mem.id === leader_id)[0],
      tasks: classfiedTasks,
      editable: wx.getStorageSync('u_id') === leader_id && compareDate(end_time,formatTime(new Date())), // 判断是否可以进行更改

    });
    console.log("此时set Data")
    wx.hideLoading();
  },
  onShow: function () {
    wx.showLoading();
    const tf_id = this.data.id;
    this.fetchTasks(tf_id);
    setTimeout(this.setFunc, 1000);
  },
  onLoad: function (options) {
    wx.hideTabBar({});

    const tf_id = options.tf_id;
    if (!tf_id) return;
    console.log(tf_id);
    const task_flow = this.data.taskFlowList.filter(tf => tf.id === tf_id)[0];
    console.log(task_flow);
    const { tasks, id, tf_describe, tf_name, is_completed, begin_time, end_time, category, members, leader_id } = task_flow;
    const classfiedTasks = this.classifyTask(tasks);
    this.setData({
      id, tf_describe, tf_name, is_completed, begin_time, end_time, category, members,
      leader: members.filter(mem => mem.id === leader_id)[0],
      tasks: classfiedTasks,
      is_leader: wx.getStorageSync('u_id') === leader_id, // 判断是否是leader
      ready: true

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
      url: '../task/task?t_id=' + task.id
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
  // 任务数据
  checkData: function () {
    wx.navigateTo({
      url: './task_flow_data/task_flow_data',
    })
  },
  myTasks: function () {
    wx.navigateTo({
      url: './my_tasks/my_tasks?tf_id=' + this.data.id + "&tasks=" + JSON.stringify(this.data.tasks) + "&tf_name=" + this.data.tf_name+"&tf_status="+this.data.is_completed,
    })
  },
  // 查看全部成员
  allMembers: function () {
    wx.navigateTo({
      url: './all_members/all_members?tf_id=' + this.data.id + "&members=" + JSON.stringify(this.data.members)
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 下拉刷新任务
    wx.showNavigationBarLoading();
    this.fetchTasks(this.data.id, this.setFunc);
    this.onShow();
    wx.stopPullDownRefresh();

  }
}

const mapStateToData = _state => {
  const state = { ..._state };
  const ids = { ...state.ids };
  const entities = { ...state.entities };
  // 组装一个完整的tf列表
  const _taskFlowList = ids.task_flows.map(id => entities.task_flows[id]);
  console.log(_taskFlowList);

  const taskFlowList = _taskFlowList.map(item => {
    const { members, tasks, images } = item;
    let _item = { ...item };
    const _members = [...members];
    const _tasks = [...tasks];
    _item.members = _members.map(mid => entities.members[mid]);
    _item.tasks = _tasks.map(tid => entities.tasks[tid]);
    _item.tasks = _item.tasks.map(t => {
      const _t = { ...t };
      const memIds = _t.members;
      const cmtIds = _t.comments;
      const imgIds = _t.images;
      const mems = memIds.map(mid => entities.members[mid]);
      const cmts = cmtIds.map(cid => entities.comments[cid]);
      const imgs = imgIds.map(iid => entities.images[iid]);
      _t.members = mems;
      _t.comments = cmts;
      _t.images = imgs;

      return _t;
    })
    return _item;
  });
  return {
    taskFlowList
  }
}

const mapDispatchToPage = dispatch => {
  return {
    fetchTasks: (tf_id) => dispatch(fetchTasks(tf_id)),
    updateTaskFlow: (u_id, tf_id, tf) => dispatch(updateTaskFlow(u_id, tf_id, tf))
  }
}
const _page = connect(mapStateToData, mapDispatchToPage)(page);
Page(_page)
// pages/task_flow/task_flow.js
import {
  connect
} from '../../libs/wechat-weapp-redux';
import { recordOperation, TYPE } from '../../actions/record';

const app = getApp();
import {
  fetchTasks,
  updateTaskFlowCate,
  fetchSingleTaskFlow
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
    showModal: false,
    editable: false,
    cateSelectorIsActive: false,
    invite: 1,
    leader_id: '',
    cur_user_avatar: '',
    cur_user_name: ''
  },
  touchStart(e) {
    console.log(e)
    this.setData({
      touchX: e.changedTouches[0].clientX,
      touchY: e.changedTouches[0].clientY
    });
  },
  touchEnd(e) {
    let endX = e.changedTouches[0].clientX;
    let endY = e.changedTouches[0].clientY;
    const { touchX, touchY } = this.data;
    this.getTouchData(endX, endY, touchX, touchY);
  },
  /***
 * 判断用户滑动
 * 左滑还是右滑
 */
  getTouchData(endX, endY, startX, startY) {
    let turn = "";
    if (endX - startX > 50 && Math.abs(endY - startY) < 50) {      //右滑
      turn = "right";
    } else if (endX - startX < -50 && Math.abs(endY - startY) < 50) {   //左滑
      turn = "left";
    }
    console.log(turn);
    if (turn === 'left') {
      wx.navigateTo({
        url: '../log/log?id=' + this.data.id + "&type=tf"
      })
    }
    return turn;
  },
  editInfo: function () {
    wx.navigateTo({
      url: '../create_task_flow/create_task_flow?flag=update&tf_id=' + this.data.id + "&tf_name=" + this.data.tf_name + "&tf_describe=" + this.data.tf_describe + "&end_time=" + this.data.end_time + "&begin_time=" + this.data.begin_time
    })
  },

  setFunc: function (id) {
    const tf_id = this.data.id || id;
    const _task_flow = this.data.taskFlowList.filter(tf => tf.id === tf_id)[0];
    if (!_task_flow) { // 没有找到任务流
      wx.showModal({
        title: "提示",
        content: "你已不在该任务流,该任务流可能已解散或者你已经退出"
      });
      wx.navigateBack();
      return;
    }

    const task_flow = { ..._task_flow };
    const { tasks } = task_flow;
    const classfiedTasks = this.classifyTask(tasks);
    this.setData({
      tasks: classfiedTasks
    });
    console.log("此时set Data")
  },
  setTaskFlowInfo: function () {
    const tf_id = this.data.id;
    const _task_flow = this.data.taskFlowList.filter(tf => tf.id === tf_id)[0];
    const task_flow = { ..._task_flow };
    console.log(task_flow);
    const { id, tf_describe, tf_name, is_completed, begin_time, end_time, category, members, leader_id, invite, nick_name: cur_user_name, avatar_url: cur_user_avatar } = task_flow;
    this.setData({
      id, tf_describe, tf_name, is_completed, begin_time, end_time, category, members, leader_id, invite, cur_user_name: cur_user_name || '', cur_user_avatar: cur_user_avatar || '',
      leader: members.filter(mem => mem.id === leader_id)[0],
      is_leader: wx.getStorageSync('u_id') === leader_id, // 判断是否是leader
      editable: app.globalData.u_id === leader_id && compareDate(end_time, formatTime(new Date())) && is_completed === 0, // 判断是否可以进行更改
    });
  },
  onShow: function () {
    // wx.showLoading();
    const tf_id = this.data.id;
    const u_id = app.globalData.u_id;
    this.setTaskFlowInfo();
    this.fetchSingleTaskFlow(u_id, tf_id, this.setFunc);
  },
  onLoad: function (options) {
    wx.hideTabBar({});
    wx.showLoading();
    const tf_id = options.tf_id;
    if (!tf_id) return;
    this.setFunc(tf_id);
    this.setData({
      id: tf_id
    })
  },
  onReady: function () {
    wx.hideLoading();
  },
  classifyTask: function (t) {
    // 将子任务按照开始日期分类 同一天的放进一个数组里 还要排序 日期大类排序决定渲染顺序  
    if (!Array.isArray(t)) return;
    const tasks = JSON.parse(JSON.stringify(t));
    // 2019-3-20 12:34:21
    // const dateTimes = tasks.map(task=>task.begin_time);
    const sortby = (t1, t2) => {
      return t1.begin_time > t2.begin_time ? 1 : -1;
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
      url: '../task/task?t_id=' + task.id + "&isFetch=true"
    })
  },
  // 加新的子任务
  addTask: function () {
    wx.navigateTo({
      url: './create_task/create_task?tf_id=' + this.data.id
    })
  },
  // 邀请新成员
  addMember: function () {
    wx.navigateTo({
      url: './add_member/add_member?tf_id=' + this.data.id + "&who=" + this.data.cur_user_name + "&tf_name=" + this.data.tf_name + "&cnt=" + this.data.members.length + "&avatar=" + this.data.cur_user_avatar
    })
  },
  // 任务数据
  checkData: function () {
    wx.navigateTo({
      url: './task_flow_data/task_flow_data?tf_id=' + this.data.id,
    })
  },
  myTasks: function () {
    wx.navigateTo({
      url: './my_tasks/my_tasks?tf_id=' + this.data.id + "&tasks=" + JSON.stringify(this.data.tasks) + "&tf_name=" + this.data.tf_name + "&tf_status=" + this.data.is_completed,
    })
  },
  // 查看全部成员
  allMembers: function () {
    wx.navigateTo({
      url: './all_members/all_members?tf_id=' + this.data.id
    })
  },
  toTaskFlowSettings: function () {
    wx.navigateTo({
      url: './tf_settings/tf_settings?tf_id=' + this.data.id + "&is_leader=" + this.data.is_leader + "&invite=" + this.data.invite
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 下拉刷新任务
    wx.showNavigationBarLoading();
    this.fetchSingleTaskFlow(app.globalData.u_id, this.data.id, this.setFunc);
    wx.stopPullDownRefresh();
  },
  onSelectCate: function () {
    this.setData({
      cateSelectorIsActive: true
    })
  },
  handelSelectCate: function (e) {
    const newCate = e.detail.newCateName;

    console.log("得到新的分类", newCate);
    if (newCate) {
      // 请求后端api更新分类
      const u_id = app.globalData.u_id;
      const { id: tf_id, tf_name, tf_describe, begin_time, end_time } = this.data;
      this.updateTaskFlowCate(u_id, tf_id, newCate);
      this.recordOperation(`添加新分类${newCate}`, TYPE.CREATE);

      setTimeout(this.setTaskFlowInfo, 1000);
      console.log("更新成功");
    } else {
      console.log("分类未更改，啥也不做");
    }
    this.setData({
      cateSelectorIsActive: false
    })
  },
  handelCancelSelectCate: function () {
    console.log("取消分类");

    this.setData({
      cateSelectorIsActive: false
    })
  }
}

const mapStateToData = _state => {
  const state = { ..._state };
  const ids = { ...state.ids };
  const entities = { ...state.entities };
  // 组装一个完整的tf列表
  const tfl = ids.task_flows.map(id => ({ ...entities.task_flows[id] }));
  const _taskFlowList = [...tfl];
  console.log(_taskFlowList);
  const taskFlowList = _taskFlowList.map(it => {
    const _item = { ...it };
    const { members, tasks } = _item;
    const _members = [...members];
    const _tasks = tasks ? [...tasks] : [];
    _item.members = _members.map(mid => entities.members[mid]);
    _item.tasks = _tasks.map(tid => entities.tasks[tid]);
    return _item;
  });
  return {
    taskFlowList
  }
}

const mapDispatchToPage = dispatch => {
  return {
    fetchTasks: (tf_id, callback) => dispatch(fetchTasks(tf_id, callback)),
    updateTaskFlowCate: (u_id, tf_id, category) => dispatch(updateTaskFlowCate(u_id, tf_id, category)),
    fetchSingleTaskFlow: (u_id, tf_id, callback) => dispatch(fetchSingleTaskFlow(u_id, tf_id, callback)),
    recordOperation: (msg, op_type) => dispatch(recordOperation(msg, op_type))

  }
}
const _page = connect(mapStateToData, mapDispatchToPage)(page);
Page(_page)
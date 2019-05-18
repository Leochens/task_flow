// pages/task_flow/create_task/create_task.js
import {
  compareDate,
  formatTime
} from '../../../utils/util';
import replaceChar from '../../../utils/replaceChar';
import { connect } from '../../../libs/wechat-weapp-redux';
import { addTask, updateTask } from '../../../actions/index';
const day = 1000 * 60 * 60 * 24;
const nextDay = new Date((Date.parse(new Date()) + day));
const _page = {

  /**
   * 页面的初始数据
   */
  data: {
    beginDate: formatTime(new Date()),
    endDate: formatTime(nextDay),
    members: [],
    selectedMembersIds: [],
    selectedMembersNames: [],
    selectedMembers: [],
    tf_id: '',
    isUpdate: false,
    task: {},
    timeLimit: {},
    t_name: '',
    t_describe: '',
    u_id: wx.getStorageSync('u_id'),
    t_id: null
  },
  _setTaskInfo: function (task) {
    const { begin_time, end_time, t_name, t_describe } = task;
    if (begin_time && end_time) {
      this.setData({
        beginDate: begin_time,
        endDate: end_time,
        t_describe,
        t_name
      })
    }
  },
  onLoad: function (op) {
    console.log(op);
    const tf_id = op.tf_id || '123456';
    const tf = this.data.getTaskFlow(tf_id);
    const t_id = op.t_id || null;
    const task = this.data.getTask(t_id) || {}; // 得到旧的task来显示
    const timeLimit = {
      beginDate: tf.begin_time,
      endDate: tf.end_time
    }
    if (Object.keys(task).length) { //
      this._setTaskInfo(task);
    } else {
      const { endDate: ed } = this.data;
      this.setData({
        endDate: ed > timeLimit.endDate ? timeLimit.endDate : ed // 超过tf结束时间 那么就设置为tf结束时间
      })
    }


    let members = tf.members || [];
    if (t_id) { // 有t_id说明是更新模式 那么选择任务人的时候要剔除掉已有的任务人
      const t_members = task.members;
      members = tf.members.filter(m => !t_members.includes(m.id));
    }
    this.setData({
      timeLimit,
      tf_id,
      members,
      isUpdate: t_id ? true : false, // 是否是处于更新任务状态
      task,
      t_id,

    })
  },
  bindBeginDateChange: function (e) {
    const {
      beginDate: oldBegindate,
      endDate,
      timeLimit
    } = this.data;
    const beginDate = e.detail;
    console.log("beginDate", e.detail);
    if (compareDate(timeLimit.beginDate, beginDate)) {
      wx.showModal({
        title: '日期选择有误',
        content: '开始日期不能比任务流开始日期小',
      });
      this.setData({
        beginDate: oldBegindate
      })
      return false
    }
    if (compareDate(beginDate, endDate)) {
      wx.showModal({
        title: '日期选择有误',
        content: '开始日期不能比结束日期大',
      });
      this.setData({
        beginDate: oldBegindate
      })
      return false
    }
    this.setData({
      beginDate
    })
  },
  bindEndDateChange: function (e) {
    const endDate = e.detail;
    const {
      endDate: oldEndDate,
      beginDate,
      timeLimit
    } = this.data;
    console.log("endDate", e.detail);
    if (compareDate(endDate, timeLimit.endDate)) {
      wx.showModal({
        title: '日期选择有误',
        content: '结束日期不能比任务流结束日期大',
      })
      this.setData({
        endDate: oldEndDate
      })
      return false;
    }
    if (compareDate(beginDate, endDate)) {
      wx.showModal({
        title: '日期选择有误',
        content: '结束日期不能比开始日期小',
      })
      this.setData({
        endDate: oldEndDate
      })
      return false;
    }
    this.setData({
      endDate
    })
  },
  selectMember: function (e) {
    // console.log()
    wx.navigateTo({
      url: './select_member/select_member?members=' + JSON.stringify(this.data.members) + "&selected_members=" + JSON.stringify(this.data.selectedMembersIds)
    })
  },
  onSubmit: function (e) {
    console.log(e);

    const data = e.detail.value;
    if (!data.t_name || !data.t_describe) {
      wx.showModal({
        title: '提示',
        content: '请填写完整字段',
      })
      return false;
    }
    // if (!this.data.selectedMembers.length && !this.data.isUpdate) {
    //   wx.showModal({
    //     title: "提示",
    //     content: "请至少选择一个任务人"
    //   });
    //   return false;
    // }
    const { t_name, t_describe } = data;

    const task = {
      t_name:replaceChar(t_name),
      t_describe:replaceChar(t_describe),
      is_completed: false,
      begin_time: this.data.beginDate,
      end_time: this.data.endDate,
      is_important: false,
      members: this.data.selectedMembers, // 第二次sql执行,
      tf_id: this.data.tf_id,
      id: this.data.t_id
    }
    if (this.data.isUpdate) {
      this.updateTask(this.data.tf_id, JSON.stringify(task), this.data.selectedMembers, this.data.u_id);
    } else {
      this.addTask(this.data.tf_id, JSON.stringify(task), this.data.selectedMembers);
    }

  }
}
const mapStateToData = state => {
  const task_flows = { ...state.entities.task_flows };
  const members = { ...state.entities.members };
  const tasks = { ...state.entities.tasks };
  const getTaskFlow = tf_id => {
    const tf = { ...task_flows[tf_id] };
    const mems = tf.members.slice();
    tf.members = mems.map(m => members[m]);
    return tf;
  };
  const getTask = t_id => ({ ...tasks[t_id] });
  return {
    getTaskFlow,
    getTask
  }
}
const mapDispatchToPage = dispatch => {
  return {
    addTask: (tf_id, task, members) => dispatch(addTask(tf_id, task, members)),
    updateTask: (tf_id, task, members, u_id) => dispatch(updateTask(tf_id, task, members, u_id))
  }
}

const page = connect(mapStateToData, mapDispatchToPage)(_page);

Page(page)
// pages/calendar/calendar.js
import initCalendar from '../../components/calendar/main';
import { setTodoLabels, switchView, jump, getSelectedDay } from '../../components/calendar/main';
import {
  connect
} from '../../libs/wechat-weapp-redux';
import { compareDate2, compareDate3, getNowDate } from '../../utils/util';
import { fetchTasksAll } from '../../actions/index';
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime';

const _page = {

  /**
   * 页面的初始数据
   */
  data: {

  },
  asyncTasks: function (u_id, callback) {
    this.fetchTasksAll(u_id, callback);
  },
  onLoad: function () {
    const u_id = wx.getStorageSync('u_id');
    const getPerDayTasks = date => {
      const { year, month, day } = date;
      const nowDate = `${year}-${month}-${day}`;
      const tasks = this.data.tasks;
      const todayTasks = tasks.filter(t => {
        // const isMyTask = t.members.includes(u_id);
        const notComplete = t.is_completed != 1;
        const isDelay = t.is_completed === 2;
        const beginDate = t.begin_time.split(' ')[0];
        const endDate = t.end_time.split(' ')[0];
        const isContinue = compareDate2(nowDate, beginDate) && compareDate2(endDate, nowDate); // 在开始与结束日期之间
        const todayIsEnd = compareDate3(nowDate, endDate);
        const todayIsBegin = compareDate3(nowDate, beginDate);
        if (isDelay) {
          t.flag = '已逾期';
          t.isDelay = true;
        }
        else if (todayIsBegin) t.flag = '开始';
        else if (todayIsEnd) t.flag = '截止';
        else if (isContinue) t.flag = '进行中';
        else { };
        return isContinue && notComplete;
      });
      return todayTasks;
    }
    const deal = () => {
      const days = this.data.calendar.days.slice();
      days.forEach(d => {
        const pTasks = getPerDayTasks(d);
        const count = pTasks.length;
        if (count) {
          d.todayTasks = pTasks;
          d.todoText = count;
        }
      })
      setTodoLabels({
        // 待办点标记设置
        pos: 'top', // 待办点标记位置 ['top', 'bottom']
        days: days.filter(d => d.todoText && d.todayTasks),
      });

      this.set({
        calendar: {
          ...this.data.calendar,
          days
        },
      });
    }
    const that = this;
    const conf = {
      // disablePastDay: true,
      afterTapDay: (currentSelect, allSelectedDays) => {
        console.log(currentSelect);
        const todayTasks = getPerDayTasks(currentSelect);
        console.log("todayTasks", todayTasks);
        that.set({
          todayTasks
        })
      },
      whenChangeMonth: (current, next) => {
        console.log(current, next)
        setTimeout(deal, 100);
      },
      afterCalendarRender(ctx) {
        const todayArr = getNowDate().split('-');
        const [year, month, day] = todayArr;
        const today = { year, month, day };
        const todayTasks = getPerDayTasks(today);
        console.log("today", today, todayTasks);
        ctx.setData({
          todayTasks
        });
      },
    }

    initCalendar(conf);

    this.asyncTasks(u_id, function () {
      deal();
      const today = that.data.calendar.selectedDay.pop();
      console.log(today);
      that.setData({
        todayTasks: getPerDayTasks(today)
      })

    });
  },
  set: function (data) {
    this.setData(data);
  },
  toTaskDetail: function (e) {

    const tid = e.currentTarget.dataset.tid;
    wx.navigateTo({
      url: '../task/task?t_id=' + tid + "&isFetch=true"
    })
  },
  onShow: function (options) {
    const Height = wx.getSystemInfoSync().windowHeight;
    console.log(Height);
    this.setData({
      Height
    })

  }
}
const mapStateToData = state => {
  const tasks = state.entities.tasks;
  const taskFlows = state.entities.task_flows;
  const _tasks = [];
  console.log(tasks);

  for (let key in tasks) {
    tasks[key].tf_name = taskFlows[tasks[key].tf_id].tf_name;
    _tasks.push(tasks[key]);
  }
  return {
    tasks: _tasks
  }
}
const mapDispatchToPage = dispatch => {
  return {
    fetchTasksAll: (u_id, callback) => dispatch(fetchTasksAll(u_id, callback))
  }
}
const page = connect(mapStateToData, mapDispatchToPage)(_page);
Page(page)
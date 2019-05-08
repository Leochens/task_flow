// components/task_flow_card/task_flow_card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    taskFlowData: {
      type: Object,
      observer: function (newVal, oldVal, changedPath) {
        //更新数据
        this.setData({
          tfData: newVal
        })
      }
    },
    isPinTop: {
      type: Boolean
    },
    tfCardType: {
      type: String
    }
  },
  observers: {
    'taskFlowData': function (taskFlowData) {
      const tf = taskFlowData;
      const leader = tf.members.filter(mem => mem.id === tf.leader_id)[0];
      const { begin_time, end_time, members, taskStatus: taskData } = tf;
      const dateData = this.calculateDate(begin_time, end_time);
      taskData.percent = (taskData.complete / (taskData.all || 1)).toFixed(4) * 100;

      this.setData({
        count: tf.members.length,
        paneData: {
          dateData,
          taskData
        },
        leader: leader || {},
        members,
        tfData: tf
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    count: 0,
    isProcessPaneActive: false,
    tfData: {}
  },

  ready: function () {
    const tf = this.properties.taskFlowData;
    // console.log(tf);
    const leader = tf.members.filter(mem => mem.id === tf.leader_id)[0];
    const { begin_time, end_time, members, taskStatus: taskData } = tf;
    const dateData = this.calculateDate(begin_time, end_time);
    taskData.percent = (taskData.complete / (taskData.all || 1)).toFixed(4) * 100;

    this.setData({
      count: tf.members.length,
      paneData: {
        dateData,
        taskData
      },
      leader: leader || {},
      members,
      tfData: tf
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    test: function () {
      console.log(this.properties);

    },
    toggle: function (e) {
      this.setData({
        isProcessPaneActive: !this.data.isProcessPaneActive
      })
    },
    delete: function (e) {
      console.log("task_flow_card")
      this.triggerEvent('onDeleteTaskFlow');
    },
    calculateDate: function (beginDate, endDate) {
      // 正则表达式匹配时间格式
      const bd = new Date(beginDate);
      const ed = new Date(endDate);
      const dayUnit = 1000 * 60 * 60 * 24;
      const duration = ed.getTime() - bd.getTime();
      const now = (new Date());
      let last = ((ed.getTime() - now.getTime()) / dayUnit).toFixed(0);
      last = last >= 0 ? last : 0;
      const durationD = ((duration / dayUnit) + 1).toFixed(0);
      const percent = ((durationD - last) / durationD).toFixed(4) * 100;
      return {
        duration: durationD,
        last: last < 0 ? 0 : last,
        percent: percent || 100
      }
    },
    calculateTask: function (tasks) {
      if (!Array.isArray(tasks)) return {};
      const all = tasks.length;
      const completedTasks = tasks.filter(task => task.is_completed == 1); // 1 完成 2 延期 0 进行中
      const ctLen = completedTasks.length;
      return {
        count: all,
        completedCount: ctLen,
        percent: (ctLen / (all || 1)).toFixed(4) * 100
      }
    }
  }
})
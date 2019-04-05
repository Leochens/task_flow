// components/task_flow_card/task_flow_card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    taskFlowData: {
      type: Object,
      observer:function(newVal,oldVal,changedPath){
        //更新数据
        this.setData({
          tfData:newVal
        })
      }
    }
  },
  observers:{
    'taskFlowData':function(taskFlowData){
      const tf = taskFlowData;
      // console.log(tf);
      const leader = tf.members.filter(mem => mem.id === tf.leader_id)[0];
      const { begin_time, end_time, tasks,members } = tf;
      const _tasks = [...tasks];
      const dateData = this.calculateDate(begin_time, end_time);
      const taskData = this.calculateTask(_tasks);
  
      this.setData({
        count: tf.members.length,
        paneData: {
          dateData,
          taskData
        },
        leader,
        members,
        tfData:tf
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    count: 0,
    isProcessPaneActive: false,
    tfData:{}
  },

  ready: function () {
    const tf = this.properties.taskFlowData;
    // console.log(tf);
    const leader = tf.members.filter(mem => mem.id === tf.leader_id)[0];
    const { begin_time, end_time, tasks,members } = tf;
    const _tasks = [...tasks];
    const dateData = this.calculateDate(begin_time, end_time);
    const taskData = this.calculateTask(_tasks);

    this.setData({
      count: tf.members.length,
      paneData: {
        dateData,
        taskData
      },
      leader,
      members,
      tfData:tf
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
    calculateDate: function (beginDate, endDate) {
      // 正则表达式匹配时间格式
      const bd = new Date(beginDate);
      const ed = new Date(endDate);
      const dayUnit = 1000 * 60 * 60 * 24;
      const duration = ed.getTime() - bd.getTime();
      const now = (new Date());
      let last = parseInt((ed.getTime() - now.getTime()) / dayUnit);
      last = last >= 0 ? last : 0;
      const durationD = parseInt(duration / dayUnit);
      const percent = ((durationD - last) / durationD).toFixed(4) * 100;
      return {
        duration: durationD,
        last,
        percent
      }
    },
    calculateTask: function(tasks){
        if(!Array.isArray(tasks)) return {};
        const all = tasks.length;
        const completedTasks = tasks.filter(task=>task.is_completed);
        const ctLen = completedTasks.length;
        return {
          count: all,
          completedCount: ctLen,
          percent: (ctLen/(all||1)).toFixed(4)*100
        }
    }
  }
})
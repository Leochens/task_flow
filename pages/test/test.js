// pages/test/test.js
const wxCharts = require('../../libs/wxcharts');
var app = getApp();
var taskFlowRing = null;
var taskRing = null;
var taskColumn = null;

const tfData = {
  task_flow: {
    continues: 14,
    delay: 4,
    completed: 10,
    all: 28
  },
  task: [ // 每个任务的情况
    {
      t_name: "任务1",
      all_members: 3,
      break_members: 1,
      completed_members: 2,
      is_completed: true,
      comments: 4,
      images: 3
    },
    {
      t_name: "任务2",
      all_members: 7,
      break_members: 0,
      completed_members: 4,
      is_completed: false,
      comments: 0,
      images: 0
    },
    {
      t_name: "任务3",
      all_members: 10,
      break_members: 8,
      completed_members: 2,
      is_completed: true,
      comments: 1,
      images: 1
    },
    {
      t_name: "任务1",
      all_members: 3,
      break_members: 1,
      completed_members: 2,
      is_completed: true,
      comments: 4,
      images: 3
    },
    {
      t_name: "任务2",
      all_members: 7,
      break_members: 0,
      completed_members: 4,
      is_completed: false,
      comments: 0,
      images: 0
    },
    {
      t_name: "任务3",
      all_members: 10,
      break_members: 8,
      completed_members: 2,
      is_completed: true,
      comments: 1,
      images: 1
    },
    {
      t_name: "任务4",
      all_members: 9,
      break_members: 3,
      completed_members: 6,
      is_completed: false,
      comments: 0,
      images: 5
    }
  ],
  members: [ // 每个人的任务完成情况
    {
      nick_name: 'Ryan',
      completed: 3,
      break: 1,
      all: 5
    },
    {
      nick_name: 'Ryan',
      completed: 3,
      break: 1,
      all: 5
    },

  ]
}
var chartData = {
  main: {
    title: '任务',
    data: tfData.task.map(t => t.all_members),
    categories: tfData.task.map(t => t.t_name)
  }
};
Page({
  data: {
    ...tfData,
    scrollLeft: 0
  },
  touchHandler: function (e) {
    console.log(taskFlowRing.getCurrentDataIndex(e));
  },
  tfRing: function (windowWidth) {
    taskFlowRing = new wxCharts({
      animation: true,
      canvasId: 'taskFlowRing',
      type: 'ring',
      extra: {
        ringWidth: 25,
        pie: {
          offsetAngle: -45
        }
      },
      title: {
        name: `${(tfData.task_flow.completed / tfData.task_flow.all).toFixed(2) * 100}%`,
        color: '#7cb5ec',
        fontSize: 25
      },
      subtitle: {
        name: '完成率',
        color: '#666666',
        fontSize: 15
      },
      series: [{
        name: '进行中',
        data: 100,
        stroke: true,
        color: "#ddd"
      }, {
        name: '已逾期',
        data: 63,
        stroke: false,
        color: "red"
      },
      {
        name: '已完成',
        data: 63,
        stroke: false,
        color: "lightblue"
      }],
      disablePieStroke: true,
      width: windowWidth,
      height: 200,
      dataLabel: false,
      legend: true,
      background: '#f5f5f5',
      padding: 0
    });
    taskFlowRing.addEventListener('renderComplete', () => {
      console.log('renderComplete');
    });
    setTimeout(() => {
      taskFlowRing.stopAnimation();
    }, 500);
  },
  tRing: function (windowWidth) {
    taskRing = new wxCharts({
      animation: true,
      canvasId: 'taskRing',
      type: 'ring',
      extra: {
        ringWidth: 25,
        pie: {
          offsetAngle: -45
        }
      },
      title: {
        name: `${(tfData.task_flow.completed / tfData.task_flow.all).toFixed(2) * 100}%`,
        color: '#7cb5ec',
        fontSize: 25
      },
      subtitle: {
        name: '完成率',
        color: '#666666',
        fontSize: 15
      },
      series: [{
        name: '进行中',
        data: 100,
        stroke: true,
        color: "#ddd"
      }, {
        name: '已逾期',
        data: 63,
        stroke: false,
        color: "red"
      },
      {
        name: '已完成',
        data: 63,
        stroke: false,
        color: "lightblue"
      }],
      disablePieStroke: true,
      width: windowWidth,
      height: 200,
      dataLabel: false,
      legend: true,
      background: '#f5f5f5',
      padding: 0
    });
    taskRing.addEventListener('renderComplete', () => {
      console.log('renderComplete');
    });
    setTimeout(() => {
      taskRing.stopAnimation();
    }, 500);
  },
  touchstart(e) {
    if (taskColumn) {
      taskColumn.scrollStart(e);
    }

  },
  touchmove(e) {
    if (taskColumn) {
      taskColumn.scroll(e);
    }
  },
  touchend(e) {
    if (taskColumn) {
      taskColumn.scrollEnd(e);
    }
  },
  tColumn: function (windowWidth) {
    taskColumn = new wxCharts({
      canvasId: 'taskColumn',
      type: 'column',
      animation: true,
      enableScroll: true,
      categories: tfData.members.map(m=>m.nick_name),
      series: [{
        name: '参与任务数',
        data: tfData.members.map(m => m.all),
        format: function (val, name) {
          return val + '人';
        }
      },
      {
        name: '完成任务数',
        data: tfData.members.map(m => m.completed),
        format: function (val, name) {
          return val + '人';
        }
      },
      {
        name: '请假任务数',
        data: tfData.members.map(m => m.break),
        format: function (val, name) {
          return val + '人';
        }
      }],
      yAxis: {
        format: function (val) {
          return val + '人';
        },
        // title: 'hello',
        min: 0
      },
      xAxis: {
        disableGrid: false,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 36
        }
      },
      // width: windowWidth,
      width: windowWidth,
      height: 200,
    });
  },
  scroll: function (e) {
    console.log(e);
    var scrollLeft = e.detail.scrollLeft;
    this.setData({ scrollLeft: scrollLeft })
  },
  onReady: function (e) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    this.tfRing(windowWidth);
    this.tRing(windowWidth);
    this.tColumn(windowWidth);
  }
});
import wxCharts from '../../../../libs/wxcharts';

/**
 *   data: [ // 每个人的任务完成情况
    {
      nick_name: 'Ryan',
      completed: 3,
      break: 1,
      all: 5
    },
    {
      nick_name: 'Tim',
      completed: 3,
      break: 1,
      all: 5
    }
  ]
 */
const getMemberColumn = function (windowWidth, id, data) {

    // TODO: 名字太长的处理一下

    const taskColumn = new wxCharts({
        canvasId: id,
        type: 'column',
        animation: true,
        enableScroll: true,
        categories: data.map(m => m.nick_name),
        series: [{
            name: '参与任务数',
            data: data.map(m => m.all),
            format: function (val, name) {
                return val + '个';
            },
            color:'#A6B2E6'
        },
        {
            name: '完成任务数',
            data: data.map(m => m.completed),
            format: function (val, name) {
                return val + '个';
            },
            color:"#70A8EA"
        },
        {
            name: '请假任务数',
            data: data.map(m => m.break),
            format: function (val, name) {
                return val + '个';
            },
            color:"#E27884"
        }],
        yAxis: {
            format: function (val) {
                return val + '个';
            },
            min: 0
        },
        xAxis: {
            disableGrid: false,
            type: 'calibration'
        },
        extra: {
            column: {
                width: 20
            }
        },
        width: windowWidth,
        height: 200,
    });

    return taskColumn;
}



export default getMemberColumn;
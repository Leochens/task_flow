import wxCharts from '../../../../libs/wxcharts';

/**
 *  data: {
        continues: 14,
        delay: 4,
        completed: 10,
        all: 28
    }
 */
const getTaskFlowRing = function (windowWidth, id, data) {
    const taskFlowRing = new wxCharts({
        animation: true,
        canvasId: id,
        type: 'ring',
        extra: {
            ringWidth: 25,
            pie: {
                offsetAngle: -45
            }
        },
        title: {
            name: `${(data.completed / data.all).toFixed(2) * 100}%`,
            color: '#2967AF',
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
            color: "#A6B2E6"
        }, {
            name: '已逾期',
            data: 63,
            stroke: false,
            color: "#E27884"
        },
        {
            name: '已完成',
            data: 63,
            stroke: false,
            color: "#70A8EA"
        }],
        disablePieStroke: false,
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

    return taskFlowRing;
}





export default getTaskFlowRing;

// components/date_time_picker/date_time_picker.js
var dateTimePicker = require('./dateTimePicker.js');

function dealValue(value) {
  if (!value || typeof value != 'string') return [];
  const [date, time] = value.split(' ');
  const [y, m, d] = date.split('-');
  const [h, mu, s] = time.split(':');
  return [y - 2000, m - 1, d - 1, h - 0, mu - 0, s - 0];

}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: String,
      observer: function(newVal, oldVal, changedPath) {
        console.log("value发生变化");
        //更新数据
        this.setData({

          dateTime: dealValue(newVal)
        })
      }

    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    date: '2018-10-01',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050
  },
  ready: function() {
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();
    const {
      value
    } = this.properties;
    const valueArr = dealValue(value);
    console.log("valueArr=>", valueArr)
    this.setData({
      dateTime: valueArr.length ? valueArr : obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    changeDate(e) {
      this.setData({
        date: e.detail.value
      });
    },
    changeTime(e) {
      this.setData({
        time: e.detail.value
      });
    },
    changeDateTime(e) {
      const {
        dateTimeArray
      } = this.data;
      const dateTime = e.detail.value;
      const v = `${dateTimeArray[0][dateTime[0]]}-${dateTimeArray[1][dateTime[1]]}-${ dateTimeArray[2][dateTime[2]]} ${dateTimeArray[3][dateTime[3]]}:${dateTimeArray[4][dateTime[4]]}:${ dateTimeArray[5][dateTime[5]]}`;

      this.triggerEvent('onChange', v)
      // this.setData({
      //   dateTime: e.detail.value
      // });
    },
    changeDateTime1(e) {
      this.setData({
        dateTime1: e.detail.value
      });
    },
    changeDateTimeColumn(e) {
      var arr = this.data.dateTime,
        dateArr = this.data.dateTimeArray;

      arr[e.detail.column] = e.detail.value;
      dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

      this.setData({
        dateTimeArray: dateArr,
        dateTime: arr
      });
    },
    changeDateTimeColumn1(e) {
      var arr = this.data.dateTime1,
        dateArr = this.data.dateTimeArray1;

      arr[e.detail.column] = e.detail.value;
      dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

      this.setData({
        dateTimeArray1: dateArr,
        dateTime1: arr
      });
    }
  }
})
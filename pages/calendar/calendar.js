// pages/calendar/calendar.js
import initCalendar from '../../components/calendar/main';
import { setTodoLabels, switchView } from '../../components/calendar/main';

const conf = {
  // multi: true, // 是否开启多选,
  // disablePastDay: true, // 是否禁选过去的日期
  /**
   * 初始化日历时指定默认选中日期，如：'2018-3-6' 或 '2018-03-06'
   * 注意：若想初始化时不默认选中当天，则将该值配置为除 undefined 以外的其他非值即可，如：空字符串, 0 ,false等。
  */
  /**
   * 选择日期后执行的事件
   * @param { object } currentSelect 当前点击的日期
   * @param { array } allSelectedDays 选择的所有日期（当mulit为true时，才有allSelectedDays参数）
   */
  afterTapDay: (currentSelect, allSelectedDays) => {
    console.log(currentSelect);
  },
  /**
   * 当改变月份时触发
   * @param { object } current 当前年月
   * @param { object } next 切换后的年月
   */
  // whenChangeMonth: (current, next) => { },
  /**
   * 日期点击事件（此事件会完全接管点击事件）
   * @param { object } currentSelect 当前点击的日期
   * @param { object } event 日期点击事件对象
   */
  // onTapDay(currentSelect, event) { 
  //   console.log(currentSelect,event);

  // },
  /**
   * 日历初次渲染完成后触发事件，如设置事件标记
   * @param { object } ctx 当前页面实例
   */
  afterCalendarRender(ctx) {
    setTodoLabels({
      // 待办点标记设置
      pos: 'top', // 待办点标记位置 ['top', 'bottom']
      // dotColor: '#40', // 待办点标记颜色
      // 待办圆圈标记设置（如圆圈标记已签到日期），该设置与点标记设置互斥
      // circle: true, // 待办
      days: [{
        year: 2019,
        month: 4,
        day: 29,
        todoText: '3'
      }, {
        year: 2019,
        month: 5,
        day: 1,
        todoText: '5'

      }],
    });
  },
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    view: 'month'
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    initCalendar(conf);

  }
})
import appConfig from '../appConfig';
var minute = 1000 * 60;
var hour = minute * 60;
var day = hour * 24;
var week = day * 7;
var month = day * 30;

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const _date = [year, month, day].map(formatNumber).join('-');
  const time = [hour, minute].map(formatNumber).join(':');
  const res = _date + ' ' + time;
  // return dynamicDate(res);
  return res;
}
const getNowDate = () => {
  const date = new Date();
  return formatTime(date).split(' ')[0];
}



function dynamicDate(stringTime) {
  var time1 = new Date().getTime();//当前的时间戳
  console.log(time1);
  var time2 = Date.parse(new Date(stringTime));//指定时间的时间戳
  console.log(time2);
  var time = time1 - time2;
  var result = null;
  if (time < 0) {
    return stringTime;
  } else if (time / month >= 1) {
    result = parseInt(time / month) + "月前";
  } else if (time / week >= 1) {
    result = parseInt(time / week) + "周前";
  } else if (time / day >= 1) {
    result = parseInt(time / day) + "天前";
  } else if (time / hour >= 1) {
    result = parseInt(time / hour) + "小时前";
  } else if (time / minute >= 1) {
    result = parseInt(time / minute) + "分钟前";
  } else {
    result = "刚刚";
  }
  console.log(result);
  return result;
}
// 把对象中特定字段的的时间格式化
const formatDateInObject = obj => {

  for (let id in obj) {
    const { begin_time, end_time, create_time } = obj[id];

    if (begin_time && end_time) {
      const bt = new Date(begin_time);
      const et = new Date(end_time);
      obj[id].begin_time = formatTime(bt);
      obj[id].end_time = formatTime(et);
    } else if (create_time) {
      const ct = new Date(create_time);
      obj[id].create_time = formatTime(ct);
    } else return;
  }
}

const getExpiration = () => {
  const timestamp = Date.parse(new Date());
  const expiration = timestamp + appConfig.expiration;
  return expiration;
}

const S2I = s => parseInt(s);
const compareDate = (date1, date2) => {

  return ((new Date(date1.replace(/-/g, "\/"))) > (new Date(date2.replace(/-/g, "\/"))));
}

const compareDate2 = (date1, date2) => {

  return ((new Date(date1.replace(/-/g, "\/"))) >= (new Date(date2.replace(/-/g, "\/"))));
}

const compareDate3 = (date1, date2) => {

  return ((new Date(date1.replace(/-/g, "\/"))) - (new Date(date2.replace(/-/g, "\/"))) === 0);
}


const replaceNULL = str => {
  if (typeof str != 'string') return '';
  return str.replace('NULL', '?');
}

module.exports = {
  formatTime: formatTime,
  getExpiration,
  S2I,
  compareDate,
  compareDate2,
  compareDate3,
  formatDateInObject,
  getNowDate,
  replaceNULL,
  dynamicDate
}

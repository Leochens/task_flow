import appConfig from '../appConfig';

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const formatDate = utcDate => {
  if (typeof utcDate != 'string') return;
  const strs = utcDate.split('T');
  const [date, _time] = strs;
  const time = _time.split('.')[0];
  return `${date} ${time}`;
}

// 把对象中特定字段的的时间格式化
const formatDateInObject = obj => {
  for(let id in obj){
    const {begin_time,end_time } = obj[id];
    obj[id].begin_time = formatDate(begin_time);
    obj[id].end_time = formatDate(end_time);
  }
}

const getExpiration = () => {
  const timestamp = Date.parse(new Date());
  const expiration = timestamp + appConfig.expiration;
  return expiration;
}

const S2I = s => parseInt(s);
const compareDate = (date1, date2) => {

  return ((new Date(date1.replace(/-/g,"\/")))>(new Date(date2.replace(/-/g,"\/"))));
}


module.exports = {
  formatTime: formatTime,
  getExpiration,
  formatDate,
  S2I,
  compareDate,
  formatDateInObject
}

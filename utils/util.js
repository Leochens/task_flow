import appConfig from '../appConfig';

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
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

const getExpiration = () => {
  const timestamp = Date.parse(new Date());
  const expiration = timestamp + appConfig.expiration;
  return expiration;
}

const S2I = s => parseInt(s);
const compareDate = (date1, date2) => {
  // const [y1, m1, d1] = date1.split('-');
  // const [y2, m2, d2] = date2.split('-');
  // if(S2I(y1)-S2I(y2)>0) return true;
  // else if(S2I(m1)-S2I(m2)>0) return true;
  // else if(S2I(d1)-S2I(d2)>0) return true;
  // else return false;
  return ((new Date(date1.replace(/-/g,"\/")))>(new Date(date2.replace(/-/g,"\/"))));
}


module.exports = {
  formatTime: formatTime,
  getExpiration,
  formatDate,
  S2I,
  compareDate
}

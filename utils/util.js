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
  if(typeof utcDate != 'string') return ;
  const strs = utcDate.split('T');
  const [date,_time] = strs;
  const time = _time.split('.')[0];
  return `${date} ${time}`;
}

const getExpiration = () => {
  const timestamp = Date.parse(new Date());
  const expiration = timestamp + appConfig.expiration;
  return expiration;
}


module.exports = {
  formatTime: formatTime,
  getExpiration,
  formatDate
}

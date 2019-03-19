// 云函数入口文件
const cloud = require('wx-server-sdk')
const requestSync = require('./requestSync.js');
cloud.init()
const secret = 'bb302760e45bf6b7072b4eee0c1b0c8d'
// 云函数入口函数
// get token
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const appid = event.userInfo.appId;
  const url = {
    url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`
  }

  const res = await requestSync(url);
  const _res = JSON.parse(res);
  return _res;

}
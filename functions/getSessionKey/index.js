// 云函数入口文件
const cloud = require('wx-server-sdk')
const requestSync = require('./requestSync');

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const code = event.code;
  const appid = event.userInfo.appId;
  // const encryptedData = event.encryptedData;
  // const iv = event.iv;
  const secret = 'bb302760e45bf6b7072b4eee0c1b0c8d'

  const url = {
    url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code'
  }

  const req = await requestSync(url);
  const session = JSON.parse(req);
  // const sessionKey = session.session_key;
  return session;
}
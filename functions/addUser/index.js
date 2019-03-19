// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const db = cloud.database();
  const wxContext = cloud.getWXContext()

  const {
    _userInfo
  } = event;
  return await db.collection('user').add({
    data: { 
      ..._userInfo,

      openId: wxContext.OPENID
    },
    success: function(_id) {
      return _id;
    },
    fail: function(err) {
      return err;
    }
  });
}
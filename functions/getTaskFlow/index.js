// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command;
// db.collection('xxx').where({
//   classId: _.or(_.eq('c1'), _.eq('c2'), _.eq('c9'))
// })

// 云函数入口函数
// 通过当前登录用户的openId来获取任务流, 只要任务流中有这个人的openId它就行
// 不管是leader还是members
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID;
  return await db.collection('task').where({
    members: 
  }).get({
    success:function(res){
      return res;
    },
    fail:function(err){
      return err;
    }
  });  
}
// pages/task_flow/all_members/all_members.js
import { connect } from '../../../libs/wechat-weapp-redux';
import { deleteTaskFlowMember } from '../../../actions/index';
const app = getApp();

const _page = {

  /**
   * 页面的初始数据
   */
  data: {
    tf_id: '',
    members: [],
    leader_id: '',
    edit: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const tf_id = options.tf_id;
    this.setData({
      tf_id
    })
  },
  onShow: function () {
    const tf = this.data.getTaskFlow(this.data.tf_id);
    const leader_id = tf.leader_id;
    const members = tf.members;
    this.setData({
      members,
      leader_id,
      tf
    })
  },
  deleteMember: function (ee) {
    const that = this;
    const delete_user_id = ee.currentTarget.dataset.uid;
    // 删除该成员
    if (delete_user_id === that.data.leader_id) return; // 不能删除自己
    wx.showModal({
      title: "删除提醒",
      content: `您确定移除该成员吗`,
      success: function (e) {
        if (e.confirm) {
          console.log('删除', delete_user_id);
          const u_id = app.globalData.u_id;
          that.deleteTaskFlowMember(u_id, that.data.tf_id, delete_user_id, that.onShow);
        }
      }
    });
  },
  edit: function () {
    this.setData({
      edit: !this.data.edit
    })
  }
}

const mapStateToData = state => {
  const entities = { ...state.entities };
  const membersEntity = { ...state.entities.members };
  const getTaskFlow = tf_id => {
    const tf = { ...entities.task_flows[tf_id] };
    const _members = [...tf.members];
    const members = _members.map(m => ({ ...membersEntity[m] }));
    tf.members = members;
    return tf;
  }
  return {
    getTaskFlow
  }
}
const mapDispatchToPage = dispatch => {
  return {
    deleteTaskFlowMember: (u_id, tf_id, delete_user_id, callback) => dispatch(deleteTaskFlowMember(u_id, tf_id, delete_user_id, callback))
  }
}

const page = connect(mapStateToData, mapDispatchToPage)(_page);

Page(page)
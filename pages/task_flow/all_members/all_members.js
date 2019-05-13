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
    leader_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const tf_id = options.tf_id;
    const tf = this.data.getTaskFlow(tf_id);
    const leader_id = tf.leader_id;
    const members = tf.members;
    this.setData({
      tf_id,
      members,
      leader_id,
      tf
    })
  },
  deleteMember: function (e) {
    const delete_user_id = e.currentTarget.dataset.uid;
    // 删除该成员
    if (delete_user_id === this.data.leader_id) return; // 不能删除自己
    console.log('删除', delete_user_id);
    const u_id = app.globalData.u_id;
    this.deleteTaskFlowMember(u_id, this.data.tf_id, delete_user_id);
  }
}

const mapStateToData = state => {
  const entities = { ...state.entities };
  const membersEntity = { ...state.entities.members };
  const getTaskFlow = tf_id => {
    const tf = { ...entities.task_flows[tf_id] };
    const _members = [...tf.members];
    const members = _members.map(m => membersEntity[m]);
    tf.members = members;
    return tf;
  }
  return {
    getTaskFlow
  }
}
const mapDispatchToPage = dispatch => {
  return {
    deleteTaskFlowMember: (u_id, tf_id, delete_user_id) => dispatch(deleteTaskFlowMember(u_id, tf_id, delete_user_id))
  }
}

const page = connect(mapStateToData, mapDispatchToPage)(_page);

Page(page)
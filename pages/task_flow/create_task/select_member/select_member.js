// pages/task_flow/create_task/select_member/select_member.js
import { connect } from '../../../../libs/wechat-weapp-redux';
const app = getApp();
const _page = {

  /**
   * 页面的初始数据
   */
  data: {
    members: [],
    currentSelected: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    const tf_id = options.tf_id;
    const selected_members = options.selected_members ? JSON.parse(options.selected_members) : [];

    const tf = this.data.getTaskFlow(tf_id);
    const leader_id = tf.leader_id;
    const members = tf.members;
    members.forEach(mem => {
      if (selected_members.includes(mem.id)) {
        mem.is_selected = true;
      }
    })
    this.setData({
      members,
      currentSelected: selected_members
    });
  },
  selectMember: function (e) {
    console.log(e);
    const uid = e.target.dataset.uid;
    // 每点击一次就执行放入|移除操作 点击完成的时候就是要选择的人员集合
    this._toggleSelectMember(uid);
  },
  _toggleSelectMember: function (uid) {
    const currentSelected = this.data.currentSelected.slice();
    if (!Array.isArray(currentSelected) || typeof uid != 'string') return;
    if (currentSelected.includes(uid)) { // 有就删除
      currentSelected.splice(currentSelected.indexOf(uid), 1);
    } else {  // 没有就添加
      currentSelected.push(uid);
    }
    this.setData({
      currentSelected
    })

  },
  onSelectCompleted: function () {
    const { members, currentSelected } = this.data;
    const pages = getCurrentPages();

    const currentPage = pages[pages.length - 1];
    const prevPage = pages[pages.length - 2];
    const _selectedMembers = members.filter(mem => currentSelected.includes(mem.id));
    const selectedMembers = _selectedMembers.map(mem => mem.nick_name);
    // 向上一页赋值
    prevPage.setData({
      selectedMembersIds: currentSelected,
      selectedMembersNames: selectedMembers,
      selectedMembers: _selectedMembers
    });
    wx.navigateBack();
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
  }
}

const page = connect(mapStateToData, mapDispatchToPage)(_page);

Page(page)
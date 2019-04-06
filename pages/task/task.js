// pages/task/task.js
import {
  connect
} from '../../libs/wechat-weapp-redux';
import { addComment } from '../../actions/index';
import { formatTime } from '../../utils/util';
const page = {

  /**
   * 页面的初始数据
   */
  data: {
    task: {},
    content: ""
  },

  extendComment: function(cmt){
    const { u_id } = cmt;
    const members = this.data.members;
    const author = members[u_id];
    return {
      ...cmt,
      nick_name: author.nick_name,
      avatar_url: author.avatar_url
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    const task = JSON.parse(options.task);
    // 获得task后紧接着获得这个task的评论和人员的状态
    const comments = task.comments.map(cmt => this.extendComment(cmt));
    console.log(task);
    task.comments = comments;
    this.setData({
      task,
    });

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function () {
  },
  commentSubmit: function (e) {
    console.log(e);
    const content = e.detail.value.comment;
    if (!content) {
      wx.showToast({
        title: "留言不能为空",
      });
      return;
    }
    const t_id = this.data.task.id;
    const cmt = {
      comment_type: 0,
      content: content,
      create_time: formatTime(new Date()),
      u_id: wx.getStorageSync('u_id'),
      t_id
    }
    this.addComment(t_id, JSON.stringify(cmt));
    const comments = [...this.data.task.comments];
    comments.push(this.extendComment(cmt));
    this.setData({
      content: "",
      task: {
        ...this.data.task,
        comments: comments
      }
    })
  }
}

const mapStateToData = state => {

  return {
    members: state.entities.members
  };
}
const mapDispatchToPage = dispatch => ({
  addComment: (t_id, cmt) => dispatch(addComment(t_id, cmt))
})
const _page = connect(mapStateToData, mapDispatchToPage)(page);
Page(_page);
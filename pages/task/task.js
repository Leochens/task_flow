// pages/task/task.js
import {
  connect
} from '../../libs/wechat-weapp-redux';
import { addComment, addImage,fetchSingleTask } from '../../actions/index';
import { formatTime } from '../../utils/util';
import APP from '../../appConfig';
const app = getApp();
const page = {

  /**
   * 页面的初始数据
   */
  data: {
    task: {},
    content: "",
    imgs: [],
    isFetch: false, // 是否从网络上请求
    t_id: '',
    editable: false
  },
  bindChooiceImage: function () {
    const u_id = wx.getStorageSync('u_id');
    const t_id = this.data.task.id;
    const that = this;
    wx.chooseImage({
      count: 3,  //最多可以选择的图片总数  
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        var tempFilePaths = res.tempFilePaths;
        //启动上传等待中...  
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 20000
        })
        var uploadImgCount = 0;

        for (var i = 0, h = tempFilePaths.length; i < h; i++) {

          wx.uploadFile({
            url: APP.apiBaseUrl + '/images',
            filePath: tempFilePaths[i],
            name: 'image',
            header: {
              'content-type': 'multipart/form-data'
            },
            formData: {
              u_id, t_id
            },
            success: function (res) {
              console.log("上传成功 res=>", res);
              const json = JSON.parse(res.data);
              console.log("上传成功=>", json);
              const img = json.img;
              that.addImage(img);
              wx.hideToast();
              wx.showToast({
                title: '上传成功',
                mask: true
              });
              wx.navigateBack();
              uploadImgCount++;
            },
            fail: function (res) {
              wx.hideToast();
              wx.showModal({
                title: '错误提示',
                content: '上传图片失败',
                showCancel: false,
                success: function (res) { }
              })
            }
          });
        }
      }
    })
  },
  previewImg: function (e) {
    const id = e.currentTarget.dataset.id;
    const { imgs } = this.data;
    const urls = imgs.map(img => img.url);
    wx.previewImage({
      current: urls[id], // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  },
  extendComment: function (cmt) {
    const { u_id } = cmt;
    const members = this.data.members;
    const author = members[u_id];
    return {
      ...cmt,
      nick_name: author.nick_name,
      avatar_url: author.avatar_url
    }
  },
  extendImage: function (img) {
    const { u_id } = img;
    const members = this.data.members;
    const author = members[u_id];
    return {
      ...img,
      nick_name: author.nick_name
    }
  },
  editInfo: function () {
    const { tf_id, id: t_id } = this.data.task;
    wx.navigateTo({
      url: '../task_flow/create_task/create_task?tf_id=' + tf_id + "&t_id=" + t_id
    })
  },
  initFromApi: function () {
    const { t_id, u_id } = this.data;
    this.fetchSingleTask(u_id, t_id, this.init); // 拉取单一的子任务的详情
    console.log("api拉取子任务详情")

  },
  init: function () {
    // 筛选出t_id指向的task
    const t_id = this.data.t_id;
    console.log(t_id);
    const task = this.data.tasks[t_id];
    // 获得task后紧接着获得这个task的评论和人员的状态
    const comments = task.comments.map(cmt => this.extendComment(cmt));
    const imgs = task.images.map(img => this.extendImage(img));

    task.comments = comments;
    task.imgs = imgs;
    const editable = this.data.isLeader(task.tf_id, this.data.u_id) && task.is_completed === 0;
    console.log(task);

    this.setData({
      task,
      imgs,
      editable
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    const t_id = options.t_id;
    const u_id = app.globalData.u_id;
    const isFetch = options.isFetch ? true : false;
    this.setData({
      t_id,
      u_id,
      isFetch
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function () {
    const isFetch = this.data.isFetch;
    isFetch ? this.initFromApi() : this.init();
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this.initFromApi();
    wx.stopPullDownRefresh();
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
      u_id: this.data.u_id,
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

  const { members, tasks, images, comments, task_flows } = state.entities;
  const _tasks = { ...tasks };
  const _members = { ...members };
  const _images = { ...images };
  const _comments = { ...comments };
  for (let t_id in _tasks) {
    const t = JSON.parse(JSON.stringify(tasks[t_id]));

    const { members: _m, images: _i, comments: _c } = t;
    const m = [..._m];
    const i = [..._i];
    const c = [..._c];

    t.members = m.map(mid => _members[mid]);
    t.comments = c.map(cid => _comments[cid]);
    t.images = i.map(iid => _images[iid]);
    _tasks[t_id] = t;
  }

  const isLeader = (tf_id, u_id) => {
    return task_flows[tf_id].leader_id === u_id;
  }
  return {
    members: state.entities.members,
    tasks: _tasks,
    isLeader
  };
}
const mapDispatchToPage = dispatch => ({
  addComment: (t_id, cmt) => dispatch(addComment(t_id, cmt)),
  addImage: (img) => dispatch(addImage(img)),
  fetchSingleTask: (u_id, t_id, callback) => dispatch(fetchSingleTask(u_id, t_id, callback))
})
const _page = connect(mapStateToData, mapDispatchToPage)(page);
Page(_page);
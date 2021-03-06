// pages/task/task.js
import {
  connect
} from '../../libs/wechat-weapp-redux';
import { addComment, addImage, fetchSingleTask, completeTask, applyTakeBreak } from '../../actions/index';
import { recordOperation, TYPE } from '../../actions/record';
import { addTodoConnect } from '../../actions/todos';
import { formatTime, dynamicDate } from '../../utils/util';
import replaceChar from '../../utils/replaceChar';
import APP from '../../appConfig';
const app = getApp();
const deletedMember = {
  nick_name: '已退出的成员',
  avatar_url: ''
}
const page = {
  data: {
    task: {},
    content: "",
    imgs: [],
    isFetch: false, // 是否从网络上请求
    t_id: '',
    editable: false,
    isMyTask: false,
    showBreakModal: false,
    hasTodo: false,
    todoPane: {},
    showTodoModal: false,
    paneName: ''
  },
  bindChooiceImage: function () {
    const u_id = wx.getStorageSync('u_id');
    const t_id = this.data.task.id;
    const that = this;
    wx.chooseImage({
      count: 1,  //最多可以选择的图片总数  
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
              const { u_id, t_id, isFetch, task } = that.data;
              const json = JSON.parse(res.data);
              console.log("上传成功=>", json);
              const img = json.img;
              that.addImage(img);
              that.recordOperation(`子任务${task.t_name}上传图片`, TYPE.CREATE)
              wx.hideToast();
              wx.showToast({
                title: '上传成功',
                mask: true
              });
              wx.redirectTo({ // 刷新
                url: `/pages/task/task?u_id=${u_id}&t_id=${t_id}&isFetch=${isFetch}`,
              })
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
  showModal: function () {
    this.setData({
      showBreakModal: true
    })
  },
  _showTodoModal: function () {
    this.setData({
      showTodoModal: true
    })
  },
  connetTodo: function () {
    this.setData({
      showTodoModal: true,
      paneName: this.data.task.t_name
    })
  },
  toTaskFlow: function () {
    const { task } = this.data;
    const tf_id = task.tf_id;
    wx.redirectTo({
      url: `/pages/task_flow/task_flow?tf_id=${tf_id}`
    })
  },
  _comfirmAddTodoPane: function (e) { //确认添加一个任务关联面板
    const paneName = e.detail.value.paneName;
    console.log(paneName)
    const { task: { id: t_id, t_name } } = this.data;
    this.recordOperation(`创建子任务[${t_name}]的关联面板[${paneName}]`, TYPE.CREATE)
    if (paneName.trim() === '' || !t_id) return;
    this.addTodoConnect({ t_id, t_name, todo_pane_name: paneName });
    this.hideModal();
    wx.showToast({
      title: "关联成功"
    });
    this.setData({ hasTodo: true })
  },
  hideModal: function () {
    this.setData({
      showBreakModal: false,
      showTodoModal: false
    })
  },
  _applyTakeBreak: function (e) {
    const break_reason = e.detail.value.break_reason;
    if (!replaceChar(break_reason)) return;
    const { task: { id: t_id }, u_id } = this.data;
    this.applyTakeBreak(t_id, u_id, break_reason);
    this.recordOperation(`子任务[${this.data.task.t_name}]申请请假`, TYPE.UPDATE);
    this.hideModal();
    this.initFromApi();
  },
  extendComment: function (cmt) {
    const { u_id } = cmt;
    const members = this.data.members;
    const intellectDatetime = this.data.intellectDatetime;
    const author = members[u_id] || deletedMember;
    return {
      ...cmt,
      nick_name: author.nick_name,
      avatar_url: author.avatar_url,
      create_time: intellectDatetime ? dynamicDate(cmt.create_time) : cmt.create_time
    }
  },
  extendImage: function (img) {
    const { u_id } = img;
    const members = this.data.members;
    const author = members[u_id] || deletedMember;
    return {
      ...img,
      nick_name: author.nick_name
    }
  },
  getMyStatus: function (status, u_id) {
    const st = status.filter(st => st.u_id === u_id).pop();
    if (st) return st.user_status;
    else return null;
  },
  editInfo: function () {
    const { tf_id, id: t_id } = this.data.task;
    wx.navigateTo({
      url: '../task_flow/create_task/create_task?tf_id=' + tf_id + "&t_id=" + t_id
    })
  },
  toTaskSettings: function () { // 子任务设置
    const { tf_id, id: t_id } = this.data.task;
    wx.navigateTo({
      url: './task_settings/task_settings?tf_id=' + tf_id + "&t_id=" + t_id
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
    const todoPane = this.data.todoPanes.filter(tp => tp.t_id === t_id && tp.connect === true).pop();

    const task = this.data.tasks[t_id];
    // 获得task后紧接着获得这个task的评论和人员的状态
    const comments = task.comments.map(cmt => this.extendComment(cmt));
    const imgs = task.images.map(img => this.extendImage(img));

    task.comments = comments;
    task.imgs = imgs;
    const editable = this.data.isLeader(task.tf_id, this.data.u_id) && task.is_completed != 1;
    console.log(task);

    const u_id = app.globalData.u_id;
    const { members } = task;
    const mids = members.map(m => m.id);
    const isMyTask = mids.includes(u_id);
    const user_status = this.getMyStatus(task.status_map, u_id);
    this.setData({
      task,
      imgs,
      editable,
      isMyTask,
      user_status,
      hasTodo: todoPane ? true : false,
      todoPane: todoPane || {}
    });
  },
  _addTodoConnect: function () {

  },
  onLoad: function (options) {
    console.log("task options", options);
    wx.showLoading({
      title: "加载中...",
      mask: true
    })
    const t_id = options.t_id;
    const u_id = app.globalData.u_id;
    // const isFetch = options.isFetch ? true : false;
    const isFetch = true;
    this.setData({
      t_id,
      u_id,
      isFetch
    })
  },
  onReady: function () {
    wx.hideLoading();
  },
  onShow: function () {
    const isFetch = this.data.isFetch;
    isFetch ? this.initFromApi() : this.init();
  },
  touchStart(e) {
    console.log(e)
    this.setData({
      touchX: e.changedTouches[0].clientX,
      touchY: e.changedTouches[0].clientY
    });
  },
  touchEnd(e) {
    let endX = e.changedTouches[0].clientX;
    let endY = e.changedTouches[0].clientY;
    const { touchX, touchY } = this.data;
    this.getTouchData(endX, endY, touchX, touchY);
  },
  /***
 * 判断用户滑动
 * 左滑还是右滑
 */
  getTouchData(endX, endY, startX, startY) {
    let turn = "";
    if (endX - startX > 50 && Math.abs(endY - startY) < 50) {      //右滑
      turn = "right";
    } else if (endX - startX < -50 && Math.abs(endY - startY) < 50) {   //左滑
      turn = "left";
    }
    console.log(turn);
    if (turn === 'left') {
      wx.navigateTo({
        url: '../log/log?id=' + this.data.task.id + '&type=t'
      })
    }
    return turn;
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this.initFromApi();
    wx.stopPullDownRefresh();
  },
  _completeTask: function () {
    const { task: { id: t_id }, u_id } = this.data;
    const that = this;
    wx.showModal({
      title: "提示",
      content: "您确定完成该任务吗",
      success: function (e) {
        if (e.confirm) {
          that.completeTask(t_id, u_id);
          const task = that.data.tasks[t_id];
          task && that.recordOperation(`完成子任务[${task.t_name}]`, TYPE.UPDATE);
        }
      }
    })

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
  const todoPanes = [...state.todos];
  const intellectDatetime = state.settings.intellectDatetime;
  const { members, tasks, images, comments, task_flows } = state.entities;
  const _tasks = { ...tasks };
  const _members = { ...members };
  const _images = { ...images };
  const _comments = { ...comments };
  for (let t_id in _tasks) {
    const t = JSON.parse(JSON.stringify(tasks[t_id]));
    const { members: _m, images: _i, comments: _c } = t;
    const m = [..._m || []];
    const i = [..._i || []];
    const c = [..._c || []];

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
    isLeader,
    intellectDatetime,
    todoPanes
  };
}
const mapDispatchToPage = dispatch => ({
  addComment: (t_id, cmt) => dispatch(addComment(t_id, cmt)),
  addImage: (img) => dispatch(addImage(img)),
  fetchSingleTask: (u_id, t_id, callback) => dispatch(fetchSingleTask(u_id, t_id, callback)),
  completeTask: (t_id, u_id) => dispatch(completeTask(t_id, u_id)),
  applyTakeBreak: (t_id, u_id, break_reason) => dispatch(applyTakeBreak(t_id, u_id, break_reason)),
  recordOperation: (msg, op_type) => dispatch(recordOperation(msg, op_type)),
  addTodoConnect: (data) => dispatch(addTodoConnect(data))
})
const _page = connect(mapStateToData, mapDispatchToPage)(page);
Page(_page);
// pages/todo/todo.js
import {
  connect
} from '../../libs/wechat-weapp-redux';
import { addTodoConnect, addTodo, addTodoNoConnect, delTodo, delTodoPane, toggleCompleteTodo } from '../../actions/todos';
const app = getApp();
const page = {
  data: {
    modalName: '',
    todoName: '',
    paneName: '',
    paneId: '',
    isDelete: false,
    dropDown: [],
    moreOperation:[]

  },
  onLoad: function (options) {
    const length = this.data.todoPanes.length;
    this.setData({
      dropDown: (new Array(length)).fill(true), // 设置都开启下拉
      moreOperation: (new Array(length)).fill(false) // 设置都开启下拉
    })
  },
  hideModal: function () {
    this.setData({
      modalName: '',
      todoName: '',
      todoPaneName: '',
      paneId: '',
    })
  },
  toggleMoreOperation:function(e){
    const idx = e.currentTarget.dataset.idx;
    const moreOperation = this.data.moreOperation.slice();
    moreOperation[idx] = !moreOperation[idx];
    this.setData({
      moreOperation
    })
  },
  toggleDropdown: function (e) {
    const idx = e.currentTarget.dataset.idx;
    const dropDown = this.data.dropDown.slice();
    dropDown[idx] = !dropDown[idx];
    this.setData({
      dropDown
    })
  },
  _addTodoConnect: function (e) {
    const t_id = '36647fde4d9438d8de877b025eb43532';
    const t_name = '张张写作业';
    const todo_pane_name = '我是一个关联todo面板';
    this.addTodoConnect({ t_id, t_name, todo_pane_name });
  },
  _addTodoNoConnect: function (e) {
    this.setData({ modalName: 'todoPane' });
  },
  toggleDeleteMode: function () {
    this.setData({
      isDelete: !this.data.isDelete
    })
  },
  _delTodoPane: function (e) {
    const paneId = e.currentTarget.dataset.paneid;
    const that = this;
    wx.showModal({
      title: "删除提醒",
      content: `您确定删除该待办面板吗`,
      success: function (e) {
        if (e.confirm) {
          that.delTodoPane(paneId);
        }
      }
    });
  },
  _addTodo: function (e) {
    const paneId = e.currentTarget.dataset.paneid;
    this.setData({ modalName: 'todo', paneId });
  },
  _comfirmAddTodoPane: function (e) {
    const paneName = e.detail.value.paneName;
    if (paneName.trim() === '') return;
    this.addTodoNoConnect({ todo_pane_name: paneName });
    this.hideModal();
  },

  _comfirmAddTodo: function (e) {
    console.log(e);
    const todoName = e.detail.value.todoName;
    if (todoName.trim() === '') return;
    const { paneId } = this.data;
    this.addTodo(todoName, paneId);
    this.hideModal();
  },
  _toggleCompleteTodo: function (e) {
    const paneId = e.currentTarget.dataset.paneid;
    const todoId = e.currentTarget.dataset.todoid;
    this.toggleCompleteTodo(todoId, paneId);
  },
  _delTodo: function (e) {
    const paneId = e.currentTarget.dataset.paneid;
    const todoId = e.currentTarget.dataset.todoid;
    this.delTodo("t1558336956000", paneId);
  },
  clear: function () {
    wx.setStorageSync('todoPanes', []);
    this.onLoad();
  }
}


const mapStateToData = (state) => {

  const todoPanes = [...state.todos];
  return {
    todoPanes
  };
}
const mapDispatchToPage = dispatch => ({
  addTodoConnect: (data) => dispatch(addTodoConnect(data)),
  addTodoNoConnect: (data) => dispatch(addTodoNoConnect(data)),
  delTodoPane: (pane_id) => dispatch(delTodoPane(pane_id)),
  addTodo: (content, pane_id) => dispatch(addTodo(content, pane_id)),
  toggleCompleteTodo: (todo_id, pane_id) => dispatch(toggleCompleteTodo(todo_id, pane_id)),
  delTodo: (todo_id, pane_id) => dispatch(delTodo(todo_id, pane_id)),
})
const _page = connect(mapStateToData, mapDispatchToPage)(page);
Page(_page);
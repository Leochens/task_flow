// pages/todo/todo.js
import {
  connect
} from '../../libs/wechat-weapp-redux';
import { addTodoConnect, addTodo, addTodoNoConnect, delTodo, delTodoPane, toggleCompleteTodo } from '../../actions/todos';
const app = getApp();
const page = {
  data: {

  },
  onLoad: function (options) {

  },
  _addTodoConnect: function (e) {
    const t_id = '36647fde4d9438d8de877b025eb43532';
    const t_name = '张张写作业';
    const todo_pane_name = '我是一个关联todo面板';
    this.addTodoConnect({ t_id, t_name, todo_pane_name });
  },
  _addTodoNoConnect: function (e) {
    const todo_pane_name = '我是一个非关联todo面板';
    this.addTodoNoConnect({ todo_pane_name });
  },
  _delTodoPane: function (e) {

  },
  _addTodo: function (e) {
    const pane_id = "p1558332703000";

    this.addTodo("我是一条todo", pane_id);
  },
  _toggleCompleteTodo: function (e) {
    const pane_id = "p1558332703000";

    this.toggleCompleteTodo("t1558333261000", pane_id);

  },
  _delTodo: function (e) {
    const pane_id = "p1558332703000";

    this.delTodo("t1558333261000", pane_id);
  },
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
import { CRUD_GET_LIST_SUCCESS } from '../actions/dataActions';
import { DEL_TODO, UP_TODO, DEL_TODO_PANE, TOGGLE_COMPLETE_TODO, ADD_TODO, ADD_TODO_CONNECT, ADD_TODO_NO_CONNECT } from '../actions/todos';

const todos = (state = wx.getStorageSync('todoPanes') || [], action) => {
    const { type, content, pane_id, todo_id, t_name, t_id, todo_pane_name } = action;
    switch (type) {
        case ADD_TODO_CONNECT: {
            const _state = state.slice();
            _state.push({
                pane_id,
                connect: true,
                t_id,
                t_name,
                todo_pane_name,
                todos: []
            });

            const newState = _state;
            wx.setStorageSync('todoPanes', newState);
            return newState;
        }
        case ADD_TODO_NO_CONNECT: {
            const _state = state.slice();

            _state.push({
                pane_id,
                connect: false,
                todo_pane_name,
                todos: []
            });
            const newState = _state;
            wx.setStorageSync('todoPanes', newState);
            return newState;
        }
        case DEL_TODO_PANE: {
            const _state = state.slice();
            let index = -1;
            for (let i = 0; i < _state.length; i++) {
                if (_state[i].pane_id === pane_id) { index = i; break };
            }
            if (index != -1) {
                _state.splice(index, 1);// 删除这个面板
            }

            const newState = _state;
            wx.setStorageSync('todoPanes', newState);
            return newState;
        }
        case ADD_TODO: {
            const _state = [...state];
            console.log(_state);
            for (let i = 0; i < _state.length; i++) {
                if (_state[i].pane_id === pane_id) {
                    const oldPane = { ..._state[i] };
                    const todos = [...oldPane.todos];
                    todos.push({ todo_id, content, status: false }); // 把新的待办扔进去
                    oldPane.todos = todos;
                    _state[i] = oldPane;
                    break;
                }
            }
            wx.setStorageSync('todoPanes', _state);
            return _state;
        }
        case TOGGLE_COMPLETE_TODO: {
            const _state = state.slice();
            for (let i = 0; i < _state.length; i++) {
                if (_state[i].pane_id === pane_id) {
                    const oldPane = { ..._state[i] };
                    const todos = [...oldPane.todos];
                    const _todos = todos.map(_item => {
                        const item = { ..._item }
                        if (item.todo_id === todo_id) {
                            item.status = !item.status
                        }
                        return item;
                    });
                    oldPane.todos = _todos;
                    _state[i] = oldPane;

                    break;
                }
            }
            wx.setStorageSync('todoPanes', _state);
            return _state;
        }
        case DEL_TODO: {
            const _state = state.slice();
            for (let i = 0; i < _state.length; i++) {
                if (_state[i].pane_id === pane_id) {
                    const oldPane = { ..._state[i] };
                    const todos = [...oldPane.todos];
                    let index = -1;
                    for (let j = 0; j < todos.length; j++) {
                        if (todos[j].todo_id === todo_id) {
                            index = j; // 找到要删除的idx
                        }
                    }
                    if (index != -1) todos.splice(index, 1);
                    oldPane.todos = todos;
                    _state[i] = oldPane;
                    break;
                }
            }
            wx.setStorageSync('todoPanes', _state);
            return _state;
        }
        case UP_TODO: {
            const _state = state.slice();
            for (let i = 0; i < _state.length; i++) {
                if (_state[i].pane_id === pane_id) {
                    const oldPane = { ..._state[i] };
                    const todos = [...oldPane.todos];
                    let index = -1;
                    for (let j = 0; j < todos.length; j++) {
                        if (todos[j].todo_id === todo_id) {
                            index = j; // 找到要删除的idx
                        }
                    }
                    if (index === -1) return state; // 没找到就返回原来的 不变
                    let willUpTodo = { ...todos[index] };
                    todos.splice(index, 1);
                    todos.unshift(willUpTodo);
                    oldPane.todos = todos;
                    _state[i] = oldPane;
                    break;
                }
            }
            wx.setStorageSync('todoPanes', _state);
            return _state;
        }

        default: return state;
    }

}

export default todos;
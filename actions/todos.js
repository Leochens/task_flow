export const ADD_TODO_CONNECT = 'ADD_TODO_CONNECT'; // 添加一个关联todo
export const ADD_TODO_NO_CONNECT = 'ADD_TODO_NO_CONNECT'; // 添加一个关联todo
export const DEL_TODO_PANE = 'DEL_TODO_PANE'; // 删除一个todo面板

export const ADD_TODO = 'ADD_TODO'; // 在某一todo面板里增加一条todo
export const TOGGLE_COMPLETE_TODO = 'TOGGLE_COMPLETE_TODO'; // 在某一todo面板里完成或者取消完成一条todo
export const DEL_TODO = 'DEL_TODO'; // 在某一todo面板里删除一条todo


const getTimeStamp = () => Date.parse(new Date());
export const addTodoConnect = (data) => {
    const { t_id, t_name, todo_pane_name } = data;
    return {
        type: ADD_TODO_CONNECT,
        pane_id: 'p' + getTimeStamp(),
        t_id,
        t_name,
        todo_pane_name,
        connect: true
    }
}
export const addTodoNoConnect = (data) => {
    const { todo_pane_name } = data;
    return {
        type: ADD_TODO_NO_CONNECT,
        pane_id: 'p' + getTimeStamp(),
        todo_pane_name,
        connect: false
    }
}

export const delTodoPane = (pane_id) => {
    return {
        type: DEL_TODO_PANE,
        pane_id
    }
}
export const addTodo = (content,pane_id) => {
    return {
        type: ADD_TODO,
        todo_id: 't' + getTimeStamp(),
        content,
        pane_id
    }
}
export const toggleCompleteTodo = (todo_id,pane_id) => {
    return {
        type: TOGGLE_COMPLETE_TODO,
        todo_id,
        pane_id
    }
}
export const delTodo = (todo_id,pane_id) => {
    return {
        type: DEL_TODO,
        todo_id,
        pane_id
    }
}
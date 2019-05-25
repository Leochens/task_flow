import { crudCreate, crudGetList, crudUpdate, crudDelete } from './dataActions'
import Schemas from '../schemas/index';
import { normalize } from '../libs/normalizr';

export const fetchTaskFlows = (u_id, callback) => {

    const normalizeFunc = response => {
        console.log("待nomalize==>", response);
        const task_flows = normalize(response.data, Schemas.taskFlows);
        console.log("nomalize后==>", task_flows);
        return task_flows;
    }
    return crudGetList('task_flows', null, null, null, `users/${u_id}/task_flows/simple`, { normalizeFunc }, callback);
};
export const fetchSingleTaskFlow = (u_id, tf_id, callback) => {
    const normalizeFunc = response => {
        console.log("待nomalize==>", response);
        const task_flows = normalize(response.data, Schemas.taskFlows);
        console.log("nomalize后==>", task_flows);
        return task_flows;
    };
    return crudGetList('task_flows_one', null, null, null, `users/${u_id}/task_flows/${tf_id}`, { normalizeFunc }, callback);
}
export const fetchTasksAll = (u_id, callback) => {
    const normalizeFunc = response => {
        console.log("待nomalize==>", response);
        const tasks = normalize(response.data, Schemas.tasks);
        console.log("nomalize后==>", tasks);
        return tasks;
    }
    return crudGetList('all_tasks', null, null, null, `users/${u_id}/tasks`, { normalizeFunc }, callback);
};
export const fetchTasks = (tf_id, callback) => {
    const normalizeFunc = response => {
        console.log("待nomalize==>", response);
        const tasks = normalize(response.data, Schemas.tasks);
        console.log("nomalize后==>", tasks);
        return tasks;
    }
    return crudGetList('tasks', null, null, null, `task_flows/${tf_id}/tasks`, { normalizeFunc, tf_id }, callback);
};
export const fetchSingleTask = (u_id, t_id, callback) => {
    const normalizeFunc = response => {
        if (response.errMsg) return undefined;
        console.log("待nomalize==>", response);
        const tasks = normalize(response.data, Schemas.tasks);
        console.log("nomalize后==>", tasks);
        return tasks;
    }
    return crudGetList('tasks', null, null, null, `tasks/${t_id}`, { normalizeFunc, t_id }, callback);
}
export const fetchMessages = (u_id, callback) => {
    const normalizeFunc = response => {
        console.log("待nomalize==>", response);
        const messages = normalize(response.data, Schemas.messages);
        console.log("nomalize后==>", messages);
        return messages;
    }
    return crudGetList('messages', null, null, null, `users/${u_id}/messages`, { normalizeFunc }, callback);
};

export const fetchReviewList = u_id => {
    return crudGetList('reviews', null, null, null, `users/${u_id}/reviews`, {});
}

export const setMessageRead = u_id => {
    return crudUpdate('messages', u_id, { u_id }, `users/${u_id}/messages`)
}
export const addTaskFlow = (u_id, tf, callback) => {
    return crudCreate('task_flows', { tf }, `users/${u_id}/task_flows`, {}, callback);
}
export const fetchTaskMemberStatus = (t_id, u_ids) => {
    return crudCreate('status', { u_ids }, `tasks/${t_id}/users/status`);
}
export const addTask = (tf_id, task, members) => {
    return crudCreate('tasks', { task }, `task_flows/${tf_id}/tasks`, { members });
}
export const updateTask = (tf_id, task, members, u_id) => {
    return crudUpdate('tasks', task.id, { task, members, u_id }, `task_flows/${tf_id}/tasks`);
}
export const changeTaskInfo = (tf_id, u_id, t_id, field, value, callback) => {
    return crudUpdate('task_info', field, { tf_id, t_id, u_id, field, value }, `tasks/${t_id}/${field}`, callback);
}



export const completeTask = (t_id, u_id) => {
    return crudCreate('completation', { u_id }, `tasks/${t_id}/complete`, { u_id, t_id });
}
export const forceCompleteTask = (t_id, u_id) => {
    return crudCreate('completation', { u_id }, `tasks/${t_id}/force_complete`, { u_id, t_id });
}
export const deleteTask = (t_id, tf_id, u_id) => {
    return crudDelete('tasks', t_id, `task_flows/${tf_id}/tasks`, null, null, { t_id, u_id });
}
export const addNewTaskFlowMember = (tf_id, u_id) => {
    return crudCreate('users', { u_id }, `task_flows/${tf_id}/users`);
}
export const addComment = (t_id, cmt) => {
    return crudCreate('comments', { cmt }, `tasks/${t_id}/comments`, { t_id, cmt });
}


export const updateTaskFlow = (u_id, tf_id, tf, callback) => {
    return crudUpdate('task_flows', tf_id, { tf, tf_id }, `users/${u_id}/task_flows`, callback)
}
export const finishTaskFlow = (u_id, tf_id, callback) => {
    return crudUpdate('finish', tf_id, { u_id, tf_id }, `users/${u_id}/task_flows/${tf_id}/finish`, callback)
}
export const updateTaskFlowCate = (u_id, tf_id, category) => {
    return crudUpdate('categories', tf_id, { category, tf_id, u_id }, `categories`)
}
export const deleteTaskFlow = (u_id, tf_id) => {
    return crudDelete('task_flows', tf_id, `users/${u_id}/task_flows`);
}
// 解散任务流
export const breakTaskFlow = (u_id, tf_id) => {
    return crudDelete('break_task_flows', tf_id, `users/${u_id}/task_flows/break`);
}
export const deleteTaskFlowMember = (u_id, tf_id, delete_user_id, callback) => {
    return crudDelete('task_flow_members', delete_user_id, `users/${u_id}/task_flows/${tf_id}/members`, { tf_id, delete_user_id }, callback);
}

export const ADD_IMG = 'ADD_IMG';
export const addImage = (img) => {
    return {
        type: ADD_IMG,
        img
    }
}




export const PIN_TOP_TASK_FLOW = 'PIN_TOP_TASK_FLOW';
export const GET_PIN_TOP_TASK_FLOW = 'GET_PIN_TOP_TASK_FLOW';
export const CANCEL_PIN_TOP_TASK_FLOW = 'CANCEL_PIN_TOP_TASK_FLOW';
export const pinTopTaskFlow = (tf_id) => {
    return {
        type: PIN_TOP_TASK_FLOW,
        tf_id
    }
}
export const cancelPinTopTaskFlow = (tf_id) => {
    return {
        type: CANCEL_PIN_TOP_TASK_FLOW,
        tf_id
    }
}
export const getPinTopTaskFlow = () => {
    return {
        type: GET_PIN_TOP_TASK_FLOW
    }
}


// 请求请假
export const applyTakeBreak = (t_id, u_id, break_reason) => {

    return crudCreate('breaks', { u_id, break_reason }, `tasks/${t_id}/break`, { t_id, u_id, break_reason });
}
// 同意请假
export const allowTakeBreak = (t_id, u_id, apply_user_id) => {
    return crudUpdate('breaks', t_id, { u_id, apply_user_id }, `tasks/${t_id}/break`);
}


// TODO: 这个api改了 增加了一个apply_user_id 记得把所有调用它的地方改了

// 拒绝请假
export const refuseTakeBreak = (t_id, u_id, apply_user_id, refuse_reason) => {
    return crudUpdate('breaks', t_id, { u_id, apply_user_id, refuse_reason }, `tasks/${t_id}/break`);
}



export const globalSearch = (u_id, keyword, callback) => {

    const normalizeFunc = response => {
        console.log("待nomalize==>", response);
        const { task_flows: tfs, tasks: ts } = response.data;
        const task_flows = normalize(tfs, Schemas.taskFlows);
        const tasks = normalize(ts, Schemas.tasks);
        const search_result = { task_flows, tasks };
        console.log("nomalize后==>", search_result);
        return search_result;
    }
    return crudGetList('search', null, null, null, `search/${u_id}/${keyword}`, { normalizeFunc, callback });
}
export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export const clearSeach = () => {
    return {
        type: CLEAR_SEARCH
    }
}



export const toggleTaskFlowMemverInvite = (u_id, tf_id, status) => {
    return crudUpdate('invite', tf_id, { tf_id, status }, `users/${u_id}/task_flows/${tf_id}/invite`);
}


export const fetchLogs = (id, type, callback) => {
    return crudGetList('logs', null, null, null, `logs/${type}/${id}`, { callback });
}

// 转让负责人
export const transferLeader = (tf_id, new_leader_id) => {
    const u_id = wx.getStorageSync('u_id');
    return crudUpdate('transfer', tf_id, { tf_id, new_leader_id }, `users/${u_id}/task_flows/${tf_id}/transfer`);
}
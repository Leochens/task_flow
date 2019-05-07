import { crudCreate, crudGetList, crudUpdate, crudDelete } from './dataActions'
import Schemas from '../schemas/index';
import { normalize } from '../libs/normalizr';
export const fetchTaskFlows = u_id => {
    const normalizeFunc = response => {
        console.log("待nomalize==>", response);
        const task_flows = normalize(response.data, Schemas.taskFlows);
        console.log("nomalize后==>", task_flows);
        return task_flows;
    }
    return crudGetList('task_flows', null, null, null, `users/${u_id}/task_flows`, { normalizeFunc });
};
export const fetchTasks = (tf_id) => {
    const normalizeFunc = response => {
        console.log("待nomalize==>", response);
        const tasks = normalize(response.data, Schemas.tasks);
        console.log("nomalize后==>", tasks);
        return tasks;
    }
    return crudGetList('tasks', null, null, null, `task_flows/${tf_id}/tasks`, { normalizeFunc, tf_id });
};
export const fetchMessages = (u_id) => {
    const normalizeFunc = response => {
        console.log("待nomalize==>", response);
        const messages = normalize(response.data, Schemas.messages);
        console.log("nomalize后==>", messages);
        return messages;
    }
    return crudGetList('messages', null, null, null, `users/${u_id}/messages`, { normalizeFunc });
};

export const fetchReviewList = u_id => {

    return crudGetList('reviews', null, null, null, `users/${u_id}/reviews`, {});
}

export const setMessageRead = u_id => {
    return crudUpdate('messages', u_id, { u_id }, `users/${u_id}/messages`)
}
export const addTaskFlow = (u_id, tf) => {
    return crudCreate('task_flows', { tf }, `users/${u_id}/task_flows`);
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

export const completeTask = (t_id, u_id) => {
    return crudCreate('completation', { u_id }, `tasks/${t_id}/complete`, { u_id, t_id });
}
export const addNewTaskFlowMember = (tf_id, u_id) => {
    return crudCreate('users', { u_id }, `task_flows/${tf_id}/users`);
}
export const addComment = (t_id, cmt) => {
    return crudCreate('comments', { cmt }, `tasks/${t_id}/comments`, { t_id, cmt });
}

export const updateTaskFlow = (u_id, tf_id, tf) => {
    return crudUpdate('task_flows', tf_id, { tf, tf_id }, `users/${u_id}/task_flows`)
}
export const updateTaskFlowCate = (u_id, tf_id, category) => {
    return crudUpdate('categories', tf_id, { category, tf_id, u_id }, `categories`)
}
export const deleteTaskFlow = (u_id, tf_id) => {
    return crudDelete('task_flows', tf_id, `users/${u_id}/task_flows`);
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
export const allowTakeBreak = (t_id, u_id) => {
    return crudUpdate('breaks', t_id, { u_id }, `tasks/${t_id}/break`);
}

// 拒绝请假
export const refuseTakeBreak = (t_id, u_id, refuse_reason) => {
    return crudUpdate('breaks', t_id, { u_id, refuse_reason }, `tasks/${t_id}/break`);
}

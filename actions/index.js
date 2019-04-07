import { crudCreate, crudGetList, crudUpdate } from './dataActions'
import Schemas from '../schemas/index';
import { normalize } from '../libs/normalizr';
// export const addTodo = (projectId, name) => (crudCreate('todos', { name }, `projects/${projectId}/todos`, { projectId: projectId }));
// export const fetchTodos = (projectId) => (crudGetList('todos', null, null, null, `projects/${projectId}/todos`, { projectId }));
// export const updateTodo = (id, data) => (crudUpdate('todos', id, { ...data, id }));

// export const addProject = (name) => (crudCreate('projects', { name }));
// export const fetchProjects = () => (crudGetList('projects'));
// export const fetchUsers = () => (crudGetList('users'));
// export const fetchTasks = () => (crudGetList('tasks'));
export const fetchTaskFlows = u_id => {
    const normalizeFunc = response => {
        console.log("待nomalize==>",response);
        const task_flows = normalize(response.data, Schemas.taskFlows);
        console.log("nomalize后==>",task_flows);
        return task_flows;
    }
    return crudGetList('task_flows', null, null, null, `users/${u_id}/task_flows`, { normalizeFunc });
};
export const fetchTasks = (tf_id) => {
    const normalizeFunc = response => {
        console.log("待nomalize==>",response);
        const tasks = normalize(response.data, Schemas.tasks);
        console.log("nomalize后==>",tasks);
        return tasks;
    }
    return crudGetList('tasks', null, null, null, `task_flows/${tf_id}/tasks`, { normalizeFunc,tf_id });
};
export const addTaskFlow = (u_id,tf) =>{
    return crudCreate('task_flows',{tf},`users/${u_id}/task_flows`);
}
export const fetchTaskMemberStatus = (t_id,u_ids) =>{
    return crudCreate('status',{u_ids},`tasks/${t_id}/users/status`);
}
export const addTask = (tf_id,task,members) =>{
    return crudCreate('tasks',{task},`task_flows/${tf_id}/tasks`,{members});
}
export const addNewTaskFlowMember = (tf_id,u_id) => {
    return crudCreate('users',{u_id},`task_flows/${tf_id}/users`);
}
export const addComment = (t_id,cmt) =>{
    return crudCreate('comments',{cmt},`tasks/${t_id}/comments`,{t_id,cmt});
}

export const updateTaskFlow = (u_id,tf_id,tf) => {
    return crudUpdate('task_flows',tf_id,{tf,tf_id},`users/${u_id}/task_flows/`)
}
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

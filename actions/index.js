import {crudCreate, crudGetList, crudUpdate} from './dataActions'

export const addTodo = (projectId, name) => (crudCreate('todos', {name}, `projects/${projectId}/todos`, {projectId: projectId}));
export const fetchTodos = (projectId) => (crudGetList('todos', null, null, null, `projects/${projectId}/todos`, {projectId}));
export const updateTodo = (id, data) => (crudUpdate('todos', id, {...data, id}));

export const addProject = (name) => (crudCreate('projects', {name}));
export const fetchProjects = () => (crudGetList('projects'));
export const fetchUsers= () => (crudGetList('users'));
export const fetchTasks = () => (crudGetList('tasks'));
export const fetchTaskFlows = () => (crudGetList('taskFlows'));


// export const fetchTest = () => (crudGetList('test'));
// export const test = () => (crudGetList())
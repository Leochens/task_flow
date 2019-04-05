// import { } from '../../actions/fetchActions';
import { CRUD_GET_LIST_SUCCESS,CRUD_CREATE_SUCCESS,CRUD_CREATE } from '../../actions/dataActions';
import { formatDateInObject } from '../../utils/util';

const range = ['task_flows'];
const tasks = (state = {}, action) => {
    const { type, payload, requestPayload, meta } = action;

    switch (type) {
        case CRUD_GET_LIST_SUCCESS: {
            if (!range.includes(meta.resource)) return state;
            if (!payload.entities) return state;

            const { tasks } = payload.entities;
            if (!tasks) return state;
            formatDateInObject(tasks);
            return {
                ...state,
                ...tasks
            }
        }
        case CRUD_CREATE_SUCCESS:{
            if(meta.resource === 'tasks'){
                const { task } = payload.entities;
                // const _task = JSON.parse(task);
                // const {members} = meta;
                // _task.members = members;
                // console.log('即时添加',_task);
                return{
                    ...state,
                    ...task
                }
            }
            return state;
        }
        default: return state;
    }
}
export default tasks;
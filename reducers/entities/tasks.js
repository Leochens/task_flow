// import { } from '../../actions/fetchActions';
import { CRUD_GET_LIST_SUCCESS,CRUD_CREATE_SUCCESS,CRUD_CREATE } from '../../actions/dataActions';
import { formatDateInObject } from '../../utils/util';

const range = ['task_flows','tasks'];
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
        default: return state;
    }
}
export default tasks;
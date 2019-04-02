// import { } from '../../actions/fetchActions';
import { CRUD_GET_LIST_SUCCESS } from '../../actions/dataActions';
import { formatDateInObject } from '../../utils/util';

const range = ['task_flows'];
const tasks = (state = {}, action) => {
    const { type, payload, requestPayload, meta } = action;

    switch (type) {
        case CRUD_GET_LIST_SUCCESS: {
            if (!range.includes(meta.resource)) return state;
            const {tasks} = payload.entities;
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
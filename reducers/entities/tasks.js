// import { } from '../../actions/fetchActions';
import { CRUD_GET_LIST_SUCCESS, CRUD_CREATE_SUCCESS, CRUD_CREATE } from '../../actions/dataActions';
import { formatDateInObject } from '../../utils/util';
import { ADD_IMG } from '../../actions/index';

const range = ['task_flows', 'tasks'];
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
        case CRUD_CREATE_SUCCESS: {
            if (meta.resource === 'break') {
                const { t_id, u_id, break_reason } = meta;
                const _state = { ...state };
                const task = { ..._state[t_id] };
                const statusMap = [...task.status_map];
                statusMap.forEach(sm => {
                    if (sm.u_id === u_id) {
                        sm.user_status = 3;// 请假中
                        sm.break_reason = break_reason;
                    }
                })
                return {
                    ...state,
                    [t_id]: {
                        ...state[t_id],
                        status_map: statusMap
                    }
                };
            }

            return state;
        }
        case ADD_IMG: {
            const { img: {
                id, t_id
            } } = action;
            return {
                ...state,
                [t_id]: {
                    ...state[t_id],
                    images: [
                        ...state[t_id].images,
                        id
                    ]
                }
            }
        }
        default: return state;
    }
}
export default tasks;
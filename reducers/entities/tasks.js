// import { } from '../../actions/fetchActions';
import { CRUD_GET_LIST_SUCCESS, CRUD_CREATE_SUCCESS, CRUD_CREATE, CRUD_UPDATE_SUCCESS } from '../../actions/dataActions';
import { formatDateInObject } from '../../utils/util';
import { ADD_IMG } from '../../actions/index';

const range = ['task_flows', 'tasks', 'all_tasks','task_flows_one'];
const tasks = (state = {}, action) => {
    const { type, payload, requestPayload, meta } = action;

    switch (type) {
        case CRUD_UPDATE_SUCCESS: {
            if (meta.resource === 'tasks') { // 后端更新task成功后在前端更新
                const { data: { task } } = requestPayload;
                const { id, t_name, t_describe } = JSON.parse(task);
                console.log("更新task成功", task);
                wx.navigateBack();

                return {
                    ...state,
                    [id]: {
                        ...state[id],
                        t_name,
                        t_describe
                    }
                }
            } else if (meta.resource === 'task_info') {
                let { t_id, field, value } = requestPayload.data;
                let newState = {}
                if (meta.id === 'members') { // 如果value是数组 那么说明现在的操作是新增成员
                    return state;
                }

                newState = {
                    ...state,
                    [t_id]: {
                        ...state[t_id],
                        [field]: value
                    }
                }
                meta.callback && setTimeout(meta.callback, 100)
                return newState;
            }

            return state;
        }
        case CRUD_GET_LIST_SUCCESS: {
            if (!range.includes(meta.resource)) return state;
            if (!payload.entities) return state;
            const { tasks } = payload.entities;
            if (!tasks) return state;

            formatDateInObject(tasks);
            meta.callback && setTimeout(meta.callback, 500)
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
                // wx.navigateBack();

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
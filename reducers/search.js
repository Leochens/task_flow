import { CRUD_GET_LIST_SUCCESS } from '../actions/dataActions';
import { CLEAR_SEARCH } from '../actions/index';

const search = (state = {
    task_flows: {},
    tasks: {},
    task_ids: [],
    task_flow_ids: []
}, action) => {
    const { type, payload, meta } = action;
    switch (type) {
        case CRUD_GET_LIST_SUCCESS: {   // 搜索成功
            if (meta.resource != 'search') return state;
            const { task_flows, tasks } = payload;
            return {
                task_flows: task_flows.entities.task_flows,
                tasks: tasks.entities.tasks,
                task_flow_ids: task_flows.result,
                task_ids: tasks.result
            }
        }
        case CLEAR_SEARCH: { // 清空搜索
            return {
                task_flows: {},
                tasks: {},
                task_ids: [],
                task_flow_ids: []
            }
        }
        default: return state;
    }

}

export default search;
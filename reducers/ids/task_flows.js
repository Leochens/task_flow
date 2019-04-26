// import { } from '../../actions/fetchActions';
import { CRUD_GET_LIST_SUCCESS, CRUD_DELETE_SUCCESS } from '../../actions/dataActions';

const range = ['task_flows'];
const task_flows = (state = [], action) => {
    const { type, payload, requestPayload, meta } = action;

    switch (type) {
        case CRUD_GET_LIST_SUCCESS: {
            if (!range.includes(meta.resource)) return state;
            return [
                // ...state,
                ...payload.result
            ]
        }
        case CRUD_DELETE_SUCCESS: {
            if (!range.includes(meta.resource)) return state;
            const id = requestPayload.id;
            const _state = state.slice();
            const index = _state.indexOf(id);
            if (index == -1) return state; // 没找到id
            _state.splice(index, 1);
            return _state;
        }
        default: return state;
    }
}
export default task_flows;
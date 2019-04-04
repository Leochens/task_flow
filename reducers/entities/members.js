// import { } from '../../actions/fetchActions';
import { CRUD_GET_LIST_SUCCESS } from '../../actions/dataActions';

const range = ['task_flows'];
const members = (state = {}, action) => {
    const { type, payload, requestPayload, meta } = action;

    switch (type) {
        case CRUD_GET_LIST_SUCCESS: {
            if (!range.includes(meta.resource)) return state;
            if (!payload.entities) return state;
            const { members } = payload.entities;
            if (!members) return state;

            return {
                ...state,
                ...payload.entities.members
            }
        }
        default: return state;
    }
}
export default members;
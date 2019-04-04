// import { } from '../../actions/fetchActions';
import { CRUD_GET_LIST_SUCCESS } from '../../actions/dataActions';
import { formatDateInObject } from '../../utils/util';

const range = ['task_flows'];
const comments = (state = {}, action) => {
    const { type, payload, requestPayload, meta } = action;

    switch (type) {
        case CRUD_GET_LIST_SUCCESS: {
            if (!range.includes(meta.resource)) return state;
            if(!payload.entities) return state;

            const {comments} = payload.entities;
            if(!comments) return state;
            formatDateInObject(comments);
            return {
                ...state,
                ...comments
            }
        }
        default: return state;
    }
}
export default comments;
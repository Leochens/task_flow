// import { } from '../../actions/fetchActions';
import { CRUD_GET_LIST_SUCCESS } from '../../actions/dataActions';

const range = ['task_flows'];
const tasks = (state = [], action) => {
    const { type, payload, requestPayload, meta } = action;

    switch (type) {
        case CRUD_GET_LIST_SUCCESS:{
            if(!range.includes(meta.resource)) return state;
            return [
                ...state,
                ...Object.keys(payload.entities.tasks)
            ]
        }
        default : return state;
    }
}
export default tasks;
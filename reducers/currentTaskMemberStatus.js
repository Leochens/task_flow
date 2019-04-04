import {
    CRUD_CREATE_SUCCESS
} from '../actions/dataActions'
// task页面的人员状态
const currentTaskMemberStatus = (state = [], action) => {
    if (action.meta && action.meta.resource !== 'status') return state;

    switch (action.type) {
        case CRUD_CREATE_SUCCESS:
            if(!action.payload) return state;
            return [
                ...action.payload.data
            ];
        default:
            return state
    }
};

export default currentTaskMemberStatus;
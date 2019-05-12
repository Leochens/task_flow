import { CRUD_GET_LIST_SUCCESS } from '../actions/dataActions';
import { formatTime } from '../utils/util';

const log = (state = [], action) => {

    const { type, meta } = action;

    switch (type) {
        case CRUD_GET_LIST_SUCCESS: {
            if (meta.resource === 'logs') {
                const { data } = action.payload;
                data.forEach(log => {
                    log.create_time = formatTime(new Date(log.create_time))
                })
                return data;
            }
        }
        default: return state;
    }
}


export default log;
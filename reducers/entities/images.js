// import { } from '../../actions/fetchActions';
import { CRUD_GET_LIST_SUCCESS } from '../../actions/dataActions';
import { ADD_IMG } from '../../actions/index';
import { formatDateInObject } from '../../utils/util';

const range = ['task_flows', 'tasks'];
const images = (state = {}, action) => {
    const { type, payload, requestPayload, meta } = action;

    switch (type) {
        case CRUD_GET_LIST_SUCCESS: {
            if (!range.includes(meta.resource)) return state;
            if (!payload.entities) return state;

            const { images } = payload.entities;
            if (!images) return state;
            // formatDateInObject(images);
            return {
                ...state,
                ...images
            }
        }
        case ADD_IMG: {
            const { img } = action;
            return {
                ...state,
                [img.id]:img
            }
        }

        default: return state;
    }
}
export default images;
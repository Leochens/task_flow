import { CRUD_GET_LIST_SUCCESS } from '../actions/dataActions';

const reviews = (state = [], action) => {
    const { type, payload, requestPayload, meta } = action;

    switch (type) {
        case CRUD_GET_LIST_SUCCESS: {
            if (meta.resource != 'reviews') return state;
            const { data } = payload;

            return data;
        }
        default: return state;
    }
}

export default reviews;


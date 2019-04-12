import { CRUD_GET_LIST_SUCCESS } from '../../actions/dataActions';


const localMessagesIds = wx.getStorageSync('messages_ids') || [];


const messages = (state = localMessagesIds, action) => {
    const { type, payload, requestPayload, meta } = action;
    switch (type) {
        case CRUD_GET_LIST_SUCCESS: {
            if (meta.resource != 'messages') return state;
            const localIds = wx.getStorageSync('messages_ids');
            const newLocalIds = Array.from(new Set([...payload.result,...localIds]));
            wx.setStorageSync('messages_ids', newLocalIds);
            return [
                ...newLocalIds
            ];
        }
        default: return state;
    }
}

export default messages;

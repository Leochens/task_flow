// import { } from '../../actions/fetchActions';
import { CRUD_GET_LIST_SUCCESS, CRUD_UPDATE_SUCCESS } from '../../actions/dataActions';
import { formatDateInObject } from '../../utils/util';

const localMessagesEntities = wx.getStorageSync('messages_entities');
const messages = (state = localMessagesEntities || {}, action) => {
    const { type, payload, requestPayload, meta } = action;

    switch (type) {
        case CRUD_GET_LIST_SUCCESS: {
            if (meta.resource != 'messages') return state;
            if (!payload.entities) return state;
            const { messages } = payload.entities;
            if (!messages) return state;
            formatDateInObject(messages);
            const _messages = JSON.parse(JSON.stringify(messages));
            // 本地缓存
            for (let key in _messages) {
                _messages[key].is_read = 1;
            }
            console.log(messages);

            const localEntities = wx.getStorageSync('messages_entities');
            const newLocalEntities = { ...localEntities, ..._messages };
            wx.setStorageSync('messages_entities', newLocalEntities);

            return {
                ...messages,
                ...state
            }

        }
        case CRUD_UPDATE_SUCCESS: {
            if (meta.resource != 'messages') return state;

            const _messages = JSON.parse(JSON.stringify(state));
            for (let key in _messages) {
                _messages[key].is_read = 1;
            }
            return _messages;
        }
        default: return state;
    }
}
export default messages;
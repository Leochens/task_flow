import {schema} from '../libs/normalizr';
const Message = new schema.Entity('messages',{},{idAttribute:'id'});

const message = [Message];
export default message;


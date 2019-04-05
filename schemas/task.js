import {schema} from '../libs/normalizr';
import members from './members';
import comments from './comments';
const Task = new schema.Entity('task',{
    members,
    comments
},{idAttribute:'id'});
export default Task;

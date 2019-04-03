import {schema} from '../libs/normalizr';
import members from './members';
import comments from './comments';
const Tasks = new schema.Entity('tasks',{
    members,
    comments
},{idAttribute:'id'});
export default [Tasks];

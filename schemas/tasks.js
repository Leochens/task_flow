import {schema} from '../libs/normalizr';
import members from './members';
const Tasks = new schema.Entity('tasks',{
    members
},{idAttribute:'id'});
export default [Tasks];

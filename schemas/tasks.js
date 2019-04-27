import {schema} from '../libs/normalizr';
import members from './members';
import comments from './comments';
import images from './images';
const Tasks = new schema.Entity('tasks',{
    members,
    comments,
    images

},{idAttribute:'id'});
export default [Tasks];

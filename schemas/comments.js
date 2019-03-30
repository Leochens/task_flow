import {schema} from '../libs/normalizr';

const Comments = new schema.Entity('comments',{},{idAttribute:'id'});
export default [Comments];

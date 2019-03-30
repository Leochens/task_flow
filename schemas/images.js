import {schema} from '../libs/normalizr';

const Images = new schema.Entity('images',{},{idAttribute:'id'});
export default [Images];

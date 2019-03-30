import { schema } from '../libs/normalizr';

const Users = new schema.Entity('members', {}, { idAttribute: 'id' });
export default [Users];

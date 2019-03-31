import {schema} from '../libs/normalizr';
import members from './members';
import tasks from './tasks';
const TaskFlow =new schema.Entity('task_flows',{
    members,tasks
},{idAttribute:'id'});
const taskFlow = [TaskFlow];

export default taskFlow;
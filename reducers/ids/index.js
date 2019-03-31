import {combineReducers} from '../../libs/redux';
import task_flows from './task_flows';
import members from './members';
import tasks from './tasks';
import comments from './comments';
import images from './images';

export default combineReducers({

    task_flows,
    members,
    tasks,
    comments,
    images
});
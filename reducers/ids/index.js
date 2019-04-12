import {combineReducers} from '../../libs/redux';
import task_flows from './task_flows';
import messages from './messages';

export default combineReducers({
    task_flows,
    messages
});
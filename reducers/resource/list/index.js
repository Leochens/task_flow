
import {combineReducers} from '../../../libs/redux';

import ids from './ids';

export default (resource) => combineReducers({
    ids: ids(resource)
});

import Redux  from '../../libs/redux';
import data from './data';
import list from './list/index';
// e.g. resourceReducer(resource.name, resource.options);
export default (resource) => Redux.combineReducers({
    data: data(resource),
    list: list(resource),
});

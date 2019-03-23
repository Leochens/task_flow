
import Redux from '../../../libs/redux';

import ids from './ids';

export default (resource) => Redux.combineReducers({
    ids: ids(resource)
});

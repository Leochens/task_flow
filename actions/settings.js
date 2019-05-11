import { crudUpdate, CRUD_UPDATE } from './dataActions';

export const TOGGLE_SETTING_PIN_TOP = 'TOGGLE_SETTING_PIN_TOP';
export const TOGGLE_SETTING_INTELLECT_DATETME = 'TOGGLE_SETTING_INTELLECT_DATETME';


export const toggleSettingPinTop = function (flag) {
    return {
        type: TOGGLE_SETTING_PIN_TOP,
        flag
    }
}

export const toggleSettingIntellectDatetime = function (flag) {
    return {
        type: TOGGLE_SETTING_INTELLECT_DATETME,
        flag
    }
}




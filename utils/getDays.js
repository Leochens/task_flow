import { formatTime } from './util';
const getDays = (cnt, today) => { // 会算上今天的
    const lastDays = [];
    for (var i = 0; i < cnt; i++) {
        const day = formatTime(new Date(new Date().setDate((today ? new Date(today) : new Date()).getDate() - i)));
        const date = day.split(' ')[0];
        lastDays.unshift(date)
    }
    return lastDays;
}

export default getDays;
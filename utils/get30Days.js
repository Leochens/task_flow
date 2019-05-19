import { formatTime } from './util';
const get30Days = () => {
    const lastMonth = [];
    for (var i = 0; i < 30; i++) {
        const day = formatTime(new Date(new Date().setDate(new Date().getDate() - i)));
        const date = day.split(' ')[0];
        lastMonth.unshift(date)
    }
    return lastMonth;
}

export default get30Days;
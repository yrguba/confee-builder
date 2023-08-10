import moment from 'moment/moment';

function dateConverter(updated_at: Date, onlyTime = false) {
    if (onlyTime) {
        return moment(updated_at).format('LT');
    }
    if (moment(updated_at).startOf('day').unix() === moment().startOf('day').unix()) {
        return moment(updated_at).format('LT');
    }
    return moment(updated_at).format('llll')?.split(',')[0];
}

export default dateConverter;

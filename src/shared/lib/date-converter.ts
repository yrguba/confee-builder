import moment from 'moment/moment';

function dateConverter(updated_at: Date, onlyTime = false) {
    const offset = moment().utcOffset();

    if (onlyTime) {
        return moment.utc(updated_at).utcOffset(offset).format('LT');
    }
    if (moment.utc(updated_at).utcOffset(offset).startOf('day').unix() === moment().startOf('day').unix()) {
        return moment.utc(updated_at).utcOffset(offset).format('LT');
    }
    return moment.utc(updated_at).utcOffset(offset).format('llll')?.split(',')[0];
}

export default dateConverter;

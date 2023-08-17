import moment from 'moment/moment';

function momentLocalZone(date?: Date) {
    const offset = moment().utcOffset();
    return moment.utc(date).utcOffset(offset);
}

export default momentLocalZone;

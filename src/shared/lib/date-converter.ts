import moment from 'moment/moment';

import momentLocalZone from './moment-local-zone';

function dateConverter(updated_at: Date, onlyTime = false) {
    if (onlyTime) {
        return momentLocalZone(updated_at).format('LT');
    }
    if (momentLocalZone(updated_at).startOf('day').unix() === momentLocalZone().startOf('day').unix()) {
        return momentLocalZone(updated_at).format('LT');
    }
    return momentLocalZone(updated_at).format('llll')?.split(',')[0];
}

export default dateConverter;

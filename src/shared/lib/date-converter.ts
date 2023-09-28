import moment from 'moment/moment';

import momentLocalZone from './moment-local-zone';

function dateConverter(updated_at: Date, onlyTime = false) {
    const unix = momentLocalZone(updated_at).unix();
    const week = 604800;
    const year = 31536000;
    if (onlyTime) {
        return momentLocalZone(updated_at).format('LT');
    }
    if (momentLocalZone(updated_at).startOf('day').unix() === momentLocalZone().startOf('day').unix()) {
        return momentLocalZone(updated_at).format('LT');
    }

    if (unix > momentLocalZone().unix() - week) {
        return momentLocalZone(updated_at).format('llll')?.split(',')[0];
    }

    if (unix > momentLocalZone().unix() - year) {
        const s = momentLocalZone(updated_at).format('L').split('.');
        return `${s[0]}.${s[1]}`;
    }

    return momentLocalZone(updated_at).format('L')?.split(',')[0];
}

export default dateConverter;

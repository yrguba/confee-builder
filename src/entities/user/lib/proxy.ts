import moment from 'moment';

import { viewerService } from '../../viewer';
import { User, UserProxy } from '../model/types';

function userProxy(user: User | undefined): any {
    if (!user) return null;
    const viewerId = viewerService.getId();
    return new Proxy(user, {
        get(target, prop: keyof UserProxy, receiver): UserProxy[keyof UserProxy] {
            switch (prop) {
                case 'full_name':
                    if (viewerId === target.id) return 'Вы';
                    return target.contact_name || `${target.first_name || ''} ${target.last_name || ''}`;

                case 'formatted_birth':
                    return target.birth ? moment(target.birth).format('LL') : null;

                case 'networkStatus':
                    return target.is_online ? 'online' : 'offline';

                case 'formatted_last_active':
                    return moment(target.last_active).calendar();

                default:
                    return target[prop];
            }
        },
    });
}

export default userProxy;

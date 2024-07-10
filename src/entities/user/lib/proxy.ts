import moment from 'moment';

import { momentLocalZone } from 'shared/lib';

import { viewerService, viewerStore } from '../../viewer';
import { User, UserProxy } from '../model/types';

function userProxy(user: User | undefined): UserProxy | null {
    if (!user) return null;
    const viewerId = viewerStore.getState().viewer.value.id;
    return new Proxy(user, {
        get(target, prop: keyof UserProxy, receiver: UserProxy): UserProxy[keyof UserProxy] {
            switch (prop) {
                case 'viewer':
                    return viewerId === target.id;

                case 'isDeleted':
                    return !!target?.deleted_at;

                case 'full_name':
                    return (
                        target.contact_name ||
                        ((target.first_name || target.last_name) && `${target.first_name || ''} ${target.last_name || ''}`) ||
                        target.nickname
                    );

                case 'formatted_birth':
                    return target.birth ? moment(target.birth).format('LL') : null;

                case 'networkStatus':
                    return viewerId === target.id ? 'online' : target.is_online ? 'online' : receiver.formatted_last_active;

                case 'formatted_last_active':
                    return target.last_active ? momentLocalZone(target.last_active).calendar() : 'Был(а) в сети недавно';

                default:
                    return target[prop];
            }
        },
    }) as UserProxy;
}

export default userProxy;

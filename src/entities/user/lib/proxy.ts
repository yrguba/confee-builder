import { User, UserProxy } from '../model/types';

function userProxy(user: User | undefined): any {
    if (!user) return null;
    return new Proxy(user, {
        get(target, prop: keyof UserProxy, receiver): UserProxy[keyof UserProxy] {
            switch (prop) {
                case 'full_name':
                    return `${target.first_name || ''} ${target.last_name || ''}`;

                case 'networkStatus':
                    return target.is_online ? 'online' : 'offline';

                default:
                    return target[prop];
            }
        },
    });
}

export default userProxy;

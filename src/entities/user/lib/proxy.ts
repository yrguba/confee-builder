import { Message, MessageProxy } from '../../message/model/types';
import { User, UserProxy } from '../model/types';

function userProxy(user: UserProxy | undefined): any {
    if (!user) return null;
    return new Proxy(user, {
        get(target, prop: keyof UserProxy, receiver): UserProxy[keyof UserProxy] {
            switch (prop) {
                case 'full_name':
                    return `${target.first_name || ''} ${target.last_name || ''}`;

                default:
                    return target[prop];
            }
        },
        set(target: UserProxy, prop: keyof MessageProxy, value, receiver) {
            return Reflect.set(target, prop, value, receiver);
        },
    });
}

export default userProxy;

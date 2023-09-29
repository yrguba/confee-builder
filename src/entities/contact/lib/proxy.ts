import { userProxy } from '../../user';
import { Contact, ContactProxy } from '../model/types';

function contactProxy(contact: Contact | undefined): any {
    if (!contact) return null;
    return new Proxy(contact, {
        get(target, prop: keyof ContactProxy, receiver): ContactProxy[keyof ContactProxy] {
            switch (prop) {
                case 'full_name':
                    return target.contact_name || `${target.first_name || ''} ${target.last_name || ''}`;

                case 'avatar':
                    return target.user?.avatar || '';

                case 'userProxy':
                    return userProxy(target?.user);

                default:
                    return target[prop];
            }
        },
    });
}

export default contactProxy;

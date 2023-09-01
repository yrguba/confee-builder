import { Message, MessageProxy } from '../../message/model/types';
import { Contact, ContactProxy } from '../model/types';

function contactProxy(contact: Contact | undefined): any {
    if (!contact) return null;
    return new Proxy(contact, {
        get(target, prop: keyof ContactProxy, receiver): ContactProxy[keyof ContactProxy] {
            switch (prop) {
                case 'full_name':
                    return target.contact_name || `${target.first_name || ''} ${target.last_name || ''}`;

                default:
                    return target[prop];
            }
        },
        set(target: Contact, prop: keyof MessageProxy, value, receiver) {
            return Reflect.set(target, prop, value, receiver);
        },
    });
}

export default contactProxy;

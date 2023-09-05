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
    });
}

export default contactProxy;

import { ContactSoreTypes } from './store';
import { User, UserProxy } from '../../user/model/types';
import { UseContactsReturnType } from '../lib/useContacts';

export type Contact = {
    id: number;
    phone: string | null;
    first_name: string | null;
    last_name: string | null;
    owner: number;
    user: User;
    contact_name: string | null;
    created_at: Date;
    updated_at: Date;
};

export type ContactProxy = {
    full_name: string;
    avatar: string;
    userProxy: UserProxy;
} & Contact;

export type { ContactSoreTypes, UseContactsReturnType };
export type Actions = 'delete' | 'mute' | 'goMeet' | 'message' | 'editName';
export type SocketIn = '';
export type SocketOut = '';

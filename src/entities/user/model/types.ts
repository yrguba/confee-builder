import { Contact } from '../../contact/model/types';

export enum Statuses {
    'ONLINE' = '#0000ff',
    'OFFLINE' = '',
}

export type User = {
    avatar: string;
    birth: string;
    contact_name: string;
    created_at: Date;
    email: string;
    first_name: string;
    id: number;
    is_online: boolean;
    last_active: Date;
    last_name: string;
    nickname: string;
    phone: string;
    updated_at: Date;
};

export type UserProxy = {
    full_name: string;
} & Contact;

export type SocketIn = 'UserUpdated';
export type SocketOut = '';

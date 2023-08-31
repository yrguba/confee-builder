import { Contact } from '../../contact/model/types';

export enum Statuses {
    'in office' = '#29CC39',
    'home work' = '#8833FF',
    'business_trip' = '#33BFFF',
    'vacation' = '#2EE5C9',
    'sick leave' = '#EFF2F7',
    'not available' = '#E62E7B',
    'online' = '#0000ff',
    'offline' = '',
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

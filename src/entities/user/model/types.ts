import { messageTypes } from 'entities/message';

import { File } from '../../message/model/types';

export enum Statuses {
    'IN_OFFICE' = '#29CC39',
    'HOME_WORK' = '#8833FF',
    'BUSINESS_TRIP' = '#33BFFF',
    'VACATION' = '#2EE5C9',
    'SICK_LEAVE' = '#EFF2F7',
    'NOT_AVAILABLE' = '#E62E7B',
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

export type Modals = {
    personalInfo: User;
};

export type SocketIn = 'UserUpdated';
export type SocketOut = '';

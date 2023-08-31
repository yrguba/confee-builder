import { messageTypes } from 'entities/message';
import { TabBarTypes } from 'shared/ui';

import { BaseTypes } from '../../../shared/types';
import { companyTypes } from '../../company';
import { File } from '../../message/model/types';
import { contactTypes } from '../index';

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

export type Contact = {
    id: number;
    phone: string | null;
    first_name: string | null;
    last_name: string | null;
    owner: number;
    user_id: number;
    contact_name: string | null;
    created_at: Date;
    updated_at: Date;
};

export type ContactProxy = {
    full_name: string;
} & Contact;

export type UseTabsAndListsReturnType = {
    tabs: TabBarTypes.TabBarItem[];
    activeTab: TabBarTypes.TabBarItem | null;
    setActiveTab: (tab: TabBarTypes.TabBarItem) => void;
    activeList: contactTypes.Contact[] | companyTypes.Company[];
};

export type Actions = 'delete' | 'mute' | 'audioCall' | 'videoCall' | 'message' | 'editName';
export type SocketIn = '';
export type SocketOut = '';

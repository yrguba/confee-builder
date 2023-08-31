import { TabBarTypes } from 'shared/ui';

import { companyTypes } from '../../company';
import { contactTypes } from '../index';

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

import { TabBarTypes } from 'shared/ui';

import { BaseTypes } from '../../../shared/types';
import { companyTypes } from '../../company';
import { Employee, EmployeeProxy } from '../../company/model/types';
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

export type UseContactsTabsAndListsReturnType = {
    tabs: TabBarTypes.TabBarItem[];
    activeTab: TabBarTypes.TabBarItem | null;
    setActiveTab: (tab: TabBarTypes.TabBarItem) => void;
    activeList: contactTypes.Contact[] | companyTypes.Company[];
    getEmployees: (depId: number) => void;
    departmentsEmployees: Record<number, Employee[]>;
    getNextPageEmployees: () => void;
    loading: boolean;
};

export type Actions = 'delete' | 'mute' | 'audioCall' | 'videoCall' | 'message' | 'editName';
export type SocketIn = '';
export type SocketOut = '';

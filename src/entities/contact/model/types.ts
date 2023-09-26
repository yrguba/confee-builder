import { InputTypes, TabBarTypes } from 'shared/ui';

import { BaseTypes } from '../../../shared/types';
import { companyTypes } from '../../company';
import { Company, Employee, EmployeeProxy } from '../../company/model/types';
import { User } from '../../user/model/types';
import { contactTypes } from '../index';

export type Contact = {
    id: number;
    phone: string | null;
    first_name: string | null;
    last_name: string | null;
    owner: number;
    user_id: number;
    user: User;
    contact_name: string | null;
    created_at: Date;
    updated_at: Date;
};

export type ContactProxy = {
    full_name: string;
    avatar: string;
} & Contact;

export type UseContactsTabsAndListsReturnType = {
    tabs: TabBarTypes.TabBarItem[];
    activeTab: TabBarTypes.TabBarItem<Company> | null;
    setActiveTab: (tab: TabBarTypes.TabBarItem) => void;
    activeList: contactTypes.Contact[] | companyTypes.Department[];
    getEmployees: (depId: number) => void;
    departmentsEmployees: Record<number, Employee[]>;
    getNextPageEmployees: () => void;
    searchInput: InputTypes.UseReturnedType;
    foundContacts: Contact[] | BaseTypes.Empty;
    foundEmployees: Employee[] | BaseTypes.Empty;
    loading: boolean;
};

export type Actions = 'delete' | 'mute' | 'audioCall' | 'videoCall' | 'message' | 'editName';
export type SocketIn = '';
export type SocketOut = '';

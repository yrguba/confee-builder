import { useEffect } from 'react';
import { useUpdateEffect } from 'react-use';

import { companyService, employeeProxy } from 'entities/company';
import { createMemo, useArray, useEasyState, useRouter } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Input, TabBarTypes } from 'shared/ui';

import { contactApi, contactProxy, contactTypes } from '..';
import { companyTypes, companyApi } from '../../company';
import { Company, Employee } from '../../company/model/types';
import { tokensService, viewerApi } from '../../viewer';

type TabPayload = {
    companyId: number | null;
    type: 'personal' | 'company';
};

function useContactsTabsAndLists() {
    const searchInput = Input.use({});

    const { data: viewerData } = viewerApi.handleGetViewer(tokensService.checkAuth());

    const { data: searchData, isLoading: searchLoading, isFetching } = companyApi.handleSearchEmployeesAndContacts({ name: searchInput.value });

    const companyId = useEasyState<number | null>(null);
    const departmentId = useEasyState<number | null>(null);

    const departments = useEasyState<companyTypes.Department[]>([]);
    const contacts = useEasyState<contactTypes.ContactProxy[]>([]);
    const employees = useEasyState<companyTypes.EmployeeProxy[]>([]);

    const departmentsEmployees = useEasyState<Record<number, Employee[]>>({});

    const { data: contactsData } = contactApi.handleGetContacts({ type: 'registered' });
    const { data: departmentsData } = companyApi.handleGetDepartments({ companyId: companyId.value });

    const contactsProxy = contactsData?.map((i) => contactProxy(i)) || [];
    // const employeesProxy = departmentsData?.map((i) => employeeProxy(i)) || [];

    const {
        data: departmentEmployees,
        isLoading,
        hasNextPage,
        fetchNextPage,
    } = companyApi.handleGetDepartmentEmployees({
        companyId: companyId.value,
        departmentId: departmentId.value,
        initialPage: 0,
    });

    const activeTab = useEasyState<TabBarTypes.TabBarItem<TabPayload> | null>(null);
    const tabs = useEasyState<TabBarTypes.TabBarItem<TabPayload>[]>([]);

    const clickTab = (tab: TabBarTypes.TabBarItem<TabPayload>) => {
        activeTab.set(tab);
        if (tab.payload?.companyId) {
            companyId.set(tab.payload.companyId);
        } else {
            contacts.set(contactsProxy);
        }
    };

    useEffect(() => {
        if (viewerData?.companies.length) {
            const defaultTab: TabBarTypes.TabBarItem<TabPayload> = {
                id: 0,
                title: 'Личные',
                payload: { companyId: null, type: 'personal' },
                callback: () => clickTab(defaultTab),
            };
            const arr: any = [defaultTab];
            activeTab.set(defaultTab);
            viewerData.companies.forEach((i: any, index: number) => {
                const companyTab: TabBarTypes.TabBarItem<TabPayload> = {
                    id: index + 1,
                    title: i.name || 'unknown',
                    payload: { companyId: i.id, type: 'company' },
                    callback: () => clickTab(companyTab),
                };
                arr.push(companyTab);
            });
            tabs.set(arr);
        }
    }, [viewerData?.companies.length]);

    const getNextPageEmployees = () => {
        hasNextPage && fetchNextPage();
    };

    const getEmployees = (depId: number) => {
        departmentId.set(depId);
    };

    useEffect(() => {
        contacts.set(contactsProxy);
    }, [contactsData]);

    useEffect(() => {
        contacts.set(searchData?.contacts?.length ? searchData?.contacts?.map((i) => contactProxy(i)) : []);
        employees.set(searchData?.employees?.length ? searchData?.employees?.map((i) => employeeProxy(i)) : []);
    }, [searchData?.contacts?.length && searchData?.employees?.length]);

    return {
        tabs: tabs.value,
        activeTab: activeTab.value,
        employees: employees.value,
        contacts: contacts.value,
        departmentsEmployees: departmentsEmployees.value,
        getEmployees,
        getNextPageEmployees,
        searchInput,
        departments: departmentsData || [],
        loading: isLoading,
        searchLoading,
    };
}

export default useContactsTabsAndLists;
export type UseContactsTabsAndListsReturnType = ReturnType<typeof useContactsTabsAndLists>;

import { useEffect } from 'react';
import { number } from 'yup';

import { employeeProxy } from 'entities/company';
import { useEasyState, useRouter } from 'shared/hooks';
import { Input, TabBarTypes } from 'shared/ui';

import { contactApi, contactProxy } from '..';
import { CardListItem } from '../../../shared/ui/card/types';
import { companyApi } from '../../company';
import { Employee, EmployeeProxy } from '../../company/model/types';
import { tokensService, viewerApi } from '../../viewer';
import { ContactProxy } from '../model/types';

type TabPayload = {
    companyId: number | null;
};

function useContacts() {
    const searchInput = Input.use({});
    const { pathname, navigate, params } = useRouter();
    const { data: viewerData } = viewerApi.handleGetViewer(tokensService.checkAuth());

    const { data: searchData, isLoading: searchLoading, isFetching } = companyApi.handleSearchEmployeesAndContacts({ name: searchInput.value });

    const companyId = useEasyState<number | null>(Number(params.company_id) || null);
    const departmentId = useEasyState<number | null>(null);

    const redirect = pathname.split('/')[1] === 'contacts';

    const departmentsEmployees = useEasyState<Record<number, Employee[]>>({});

    const { data: contactsData } = contactApi.handleGetContacts({ type: 'registered' });
    const { data: departmentsData } = companyApi.handleGetDepartments({ companyId: companyId.value });

    const {
        data: employeesData,
        isLoading,
        hasNextPage: hasNextPageEmployees,
        fetchNextPage: fetchNextPageEmployee,
    } = companyApi.handleGetDepartmentEmployees({
        companyId: companyId.value,
        departmentId: departmentId.value,
        initialPage: 0,
    });

    const activeTab = useEasyState<TabBarTypes.TabBarItem<TabPayload> | null>(null);
    const tabs = useEasyState<TabBarTypes.TabBarItem<TabPayload>[]>([]);

    const clickTab = (tab: TabBarTypes.TabBarItem<TabPayload>) => {
        activeTab.set(tab);
        if (redirect) {
            navigate(tab?.payload?.companyId ? `/contacts/company/${tab.payload.companyId}` : '/contacts/personal');
        }
        if (tab.payload?.companyId) {
            companyId.set(tab.payload.companyId);
        } else {
        }
    };

    useEffect(() => {
        if (viewerData?.companies.length) {
            const defaultTab: TabBarTypes.TabBarItem<TabPayload> = {
                id: 0,
                title: 'Личные',
                payload: { companyId: null },
                callback: () => clickTab(defaultTab),
            };
            const arr: any = [defaultTab];

            (!redirect || !params.company_id) && activeTab.set(defaultTab);
            viewerData.companies.forEach((i: any, index: number) => {
                const companyTab: TabBarTypes.TabBarItem<TabPayload> = {
                    id: index + 1,
                    title: i.name || 'unknown',
                    payload: { companyId: i.id },
                    callback: () => clickTab(companyTab),
                };
                Number(params.company_id) === i.id && redirect && activeTab.set(companyTab);
                arr.push(companyTab);
            });
            tabs.set(arr);
        }
    }, [viewerData?.companies.length]);

    const getDepartments = (data: { companyId: number | null }) => {
        companyId.set(data.companyId);
        const found = tabs.value.find((i) => i?.payload?.companyId === data.companyId);
        setTimeout(() => console.log(tabs), 2000);
        found && activeTab.set(found);
    };

    const getNextPage = (type: 'employee') => {
        switch (type) {
            case 'employee':
                hasNextPageEmployees && fetchNextPageEmployee();
        }
    };

    const getEmployees = (depId: number) => {
        depId && departmentId.set(depId);
    };

    const getEmployeesFromDepartment = () => {
        const arr: EmployeeProxy[] = [];
        employeesData?.pages.map((page) => {
            page.data.data.forEach((e: any) => {
                arr.push(employeeProxy(e));
            });
        });
        return arr;
    };

    return {
        tabs: tabs.value,
        activeTab: activeTab.value,
        employees: searchInput.value ? searchData?.employees?.map((i) => employeeProxy(i)) || [] : getEmployeesFromDepartment() || [],
        contacts: searchInput.value ? searchData?.contacts?.map((i) => contactProxy(i)) || [] : contactsData?.map((i) => contactProxy(i)) || [],
        getEmployees,
        getNextPage,
        searchInput,
        getDepartments,
        departments: departmentsData || [],
        loading: isLoading,
    };
}

export default useContacts;
export type UseContactsReturnType = ReturnType<typeof useContacts>;

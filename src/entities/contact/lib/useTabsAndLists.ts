import { useEffect } from 'react';
import { useUpdateEffect } from 'react-use';

import { companyService, employeeProxy } from 'entities/company';
import { createMemo, useEasyState, useRouter } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Input, TabBarTypes } from 'shared/ui';

import { contactApi, contactProxy, contactTypes } from '..';
import { companyTypes, companyApi } from '../../company';
import { Company, Employee } from '../../company/model/types';
import { UseContactsTabsAndListsReturnType } from '../model/types';

type Props = {
    companies: companyTypes.Company[] | BaseTypes.Empty;
    redirect?: boolean;
};

const memoTabs = createMemo((companies: companyTypes.Company[] | BaseTypes.Empty) => {
    const tabs: TabBarTypes.TabBarItem<Company>[] = [{ id: 0, title: 'Личные', callback: () => '' }];
    if (companies?.length) {
        companies.forEach((i, index) => {
            tabs.push({ id: index + 1, title: i.name || '', callback: () => '', payload: i });
        });
    }
    return tabs;
});
const memoEmployees = createMemo(companyService.getUpdatedEmployeesList);

function useContactsTabsAndLists(props: Props): UseContactsTabsAndListsReturnType {
    const tabs = memoTabs(props.companies);
    const { redirect = true } = props;
    const { navigate, pathname, params } = useRouter();
    const searchInput = Input.use({});

    const { data: searchData, isLoading: searchLoading, isFetching } = companyApi.handleSearchEmployeesAndContacts({ name: searchInput.value });

    const departmentId = useEasyState<number | null>(null);

    const activeTab = useEasyState<TabBarTypes.TabBarItem<Company> | null>(null);
    const activeList = useEasyState<contactTypes.ContactProxy[] | companyTypes.EmployeeProxy[]>([]);
    const departments = useEasyState<companyTypes.Department[]>([]);
    const departmentsEmployees = useEasyState<Record<number, Employee[]>>({});

    const companyId = params.company_id || activeTab.value?.payload?.id;

    const { data: contactsData } = contactApi.handleGetContacts({ type: 'registered' });
    const { data: departmentsData } = companyApi.handleGetDepartments({ companyId });

    const {
        data: departmentEmployees,
        isLoading,
        hasNextPage,
        fetchNextPage,
    } = companyApi.handleGetDepartmentEmployees({
        companyId,
        departmentId: departmentId.value,
        initialPage: 0,
    });

    const employees = memoEmployees(departmentEmployees);

    const getNextPageEmployees = () => {
        hasNextPage && fetchNextPage();
    };

    const getEmployees = (depId: number) => {
        departmentId.set(depId);
    };

    const clickTab = (tab: TabBarTypes.TabBarItem<Company>) => {
        activeTab.set(tab);
        if (redirect) {
            if (tab.title === 'Личные') return navigate('/contacts/personal');
            return navigate(`/contacts/companies/${tab.payload?.id}`);
        }
    };

    useUpdateEffect(() => {
        const key = departmentId.value as number;
        departmentsEmployees.set((prev) => ({ ...prev, [key]: employees }));
    }, [departmentEmployees?.pages]);

    useEffect(() => {
        if (contactsData && activeTab.value?.title === 'Личные') {
            activeList.set(contactsData.map((i) => contactProxy(i)));
        } else {
            props.companies && departmentsData && departments.set(departmentsData);
        }
    }, [activeTab.value, departmentsData]);

    useEffect(() => {
        if (pathname.includes('companies') && redirect) {
            tabs.length && activeTab.set(tabs[1]);
            if (departmentsData) {
                departments.set(departmentsData);
            }
        }
    }, [props.companies, activeTab.value, departmentsData]);

    useEffect(() => {
        if (pathname.includes('personal') || !redirect) {
            tabs.length && activeTab.set(tabs[0]);
            contactsData && activeList.set(contactsData.map((i) => contactProxy(i)));
        }
    }, [contactsData]);

    return {
        tabs,
        activeTab: activeTab.value,
        setActiveTab: clickTab,
        activeList: activeList.value,
        departmentsEmployees: departmentsEmployees.value,
        getEmployees,
        getNextPageEmployees,
        searchInput,
        foundContacts: isFetching ? null : searchInput.value ? searchData?.contacts?.map((i) => contactProxy(i)) || [] : null,
        foundEmployees: isFetching ? null : searchInput.value ? searchData?.employees?.map((i) => employeeProxy(i)) || [] : null,
        departments: departments.value,
        loading: isLoading,
        searchLoading,
    };
}

export default useContactsTabsAndLists;

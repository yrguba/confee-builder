import { prevCategory } from 'emoji-picker-react/dist/DomUtils/selectors';
import { useEffect } from 'react';
import { useUpdateEffect } from 'react-use';

import { companyService } from 'entities/company';
import { BaseTypes } from 'shared/types';

import { contactApi, contactTypes } from '..';
import { createMemo, useEasyState, useRouter } from '../../../shared/hooks';
import { Input, TabBarTypes } from '../../../shared/ui';
import { companyTypes, companyApi, employeeProxy } from '../../company';
import { Company, Employee } from '../../company/model/types';
import { UseContactsTabsAndListsReturnType } from '../model/types';

type Props = {
    companies: companyTypes.Company[] | BaseTypes.Empty;
};

const memoTabs = createMemo((companies: companyTypes.Company[] | BaseTypes.Empty) => {
    const tabs: TabBarTypes.TabBarItem<Company>[] = [{ id: 0, title: 'личные', callback: () => '' }];
    if (companies?.length) {
        const arr: TabBarTypes.TabBarItem[] = [];
        companies.forEach((i, index) => {
            arr.push({ id: index + 1, title: i.name || '', callback: () => '', payload: i });
        });
        return tabs.concat(arr);
    }
    return tabs;
});
const memoEmployees = createMemo(companyService.getUpdatedEmployeesList);

function useContactsTabsAndLists(props: Props): UseContactsTabsAndListsReturnType {
    const tabs = memoTabs(props.companies);
    const { navigate, pathname } = useRouter();
    const searchInput = Input.use({});
    const { data: searchData, isLoading: searchLoading, isFetching } = companyApi.handleSearchEmployeesAndContacts({ name: searchInput.value });

    const departmentId = useEasyState<number | null>(null);

    const activeTab = useEasyState<TabBarTypes.TabBarItem<Company> | null>(null);
    const activeList = useEasyState<contactTypes.Contact[] | companyTypes.Company[]>([]);
    const departmentsEmployees = useEasyState<Record<number, Employee[]>>({});

    const { data: contacts } = contactApi.handleGetContacts({ type: 'registered' });
    const {
        data: departmentEmployees,
        isLoading,
        hasNextPage,
        fetchNextPage,
    } = companyApi.handleGetDepartmentEmployees({
        companyId: activeTab.value?.payload?.id,
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

    const clickTab = (tab: TabBarTypes.TabBarItem) => {
        activeTab.set(tab);
        if (tab.title === 'личные') return navigate('/contacts');
        return navigate('/companies');
    };

    useUpdateEffect(() => {
        const key = departmentId.value as number;
        departmentsEmployees.set((prev) => ({ ...prev, [key]: employees }));
    }, [departmentEmployees?.pages]);

    useUpdateEffect(() => {
        if (contacts && activeTab.value?.title === 'личные') {
            activeList.set(contacts);
        } else {
            props.companies &&
                props.companies.forEach((i) => {
                    if (i.name === activeTab.value?.title) {
                        activeList.set([i]);
                    }
                });
        }
    }, [activeTab.value]);

    useEffect(() => {
        if (pathname.includes('companies')) {
            tabs.length && activeTab.set(tabs[1]);
            props.companies && activeList.set(props.companies);
        }
    }, [props.companies]);

    useEffect(() => {
        if (pathname.includes('contacts')) {
            tabs.length && activeTab.set(tabs[0]);
            contacts?.length && activeList.set(contacts);
        }
    }, [contacts]);

    return {
        tabs,
        activeTab: activeTab.value,
        setActiveTab: clickTab,
        activeList: activeList.value,
        departmentsEmployees: departmentsEmployees.value,
        getEmployees,
        getNextPageEmployees,
        searchInput,
        foundContacts: isFetching ? null : searchInput.value ? searchData?.contacts || [] : null,
        foundEmployees: isFetching ? null : searchInput.value ? searchData?.employees || [] : null,
        loading: isLoading,
    };
}

export default useContactsTabsAndLists;

import { prevCategory } from 'emoji-picker-react/dist/DomUtils/selectors';
import { useEffect } from 'react';
import { useUpdateEffect } from 'react-use';

import { companyService } from 'entities/company';
import { BaseTypes } from 'shared/types';

import { contactApi, contactTypes } from '..';
import { createMemo, useEasyState } from '../../../shared/hooks';
import { TabBarTypes } from '../../../shared/ui';
import { companyTypes, companyApi, employeeProxy } from '../../company';
import { Company, Employee } from '../../company/model/types';
import { UseContactsTabsAndListsReturnType } from '../model/types';

type Props = {
    companies: companyTypes.Company[] | BaseTypes.Empty;
};

const memoTabs = createMemo((companies: companyTypes.Company[] | BaseTypes.Empty) => {
    const tabs: TabBarTypes.TabBarItem<Company>[] = [{ id: 0, title: 'Личные', callback: () => '' }];
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

    useUpdateEffect(() => {
        const key = departmentId.value as number;
        departmentsEmployees.set((prev) => ({ ...prev, [key]: employees }));
    }, [departmentEmployees?.pages]);

    useUpdateEffect(() => {
        if (contacts && activeTab.value?.title === 'Личные') {
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
        tabs.length && activeTab.set(tabs[0]);
        contacts?.length && activeList.set(contacts);
    }, [contacts, props.companies]);

    return {
        tabs,
        activeTab: activeTab.value,
        setActiveTab: activeTab.set,
        activeList: activeList.value,
        departmentsEmployees: departmentsEmployees.value,
        getEmployees,
        getNextPageEmployees,
        loading: isLoading,
    };
}

export default useContactsTabsAndLists;

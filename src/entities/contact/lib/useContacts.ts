import { useEffect } from 'react';

import { employeeProxy } from 'entities/company';
import { useEasyState, useRouter } from 'shared/hooks';
import { Input, TabBarTypes } from 'shared/ui';

import { contactApi, contactProxy } from '..';
import { companyApi } from '../../company';
import { Department, EmployeeProxy } from '../../company/model/types';
import { viewerApi, viewerStore } from '../../viewer';

type TabPayload = {
    companyId: number | null;
};

type Props = {
    registeredEmployee?: boolean;
};

function useContacts(props?: Props) {
    const searchInput = Input.use({});
    const { pathname, navigate, params } = useRouter();

    const { data: viewerData } = viewerApi.handleGetViewer();

    const {
        data: searchData,
        isLoading: searchLoading,
        isFetching,
    } = companyApi.handleSearchEmployeesAndContacts({ name: searchInput.value, registered: !!props?.registeredEmployee });

    const companyId = useEasyState<number | null>(Number(params.company_id) || null);
    const departmentId = useEasyState<number | null>(null);

    const redirect = pathname.split('/')[1] === 'contacts';

    const departmentChildrens = useEasyState<Record<number, Department[]>>({});
    const departmentsEmployees = useEasyState<Record<number, EmployeeProxy[]>>({});
    const rootDepartments = useEasyState<any>({});

    const { data: contactsData } = contactApi.handleGetContacts({ type: 'registered' });
    const { data: departmentsData } = companyApi.handleGetDepartments({ companyId: companyId.value, registered: !!props?.registeredEmployee });
    const {
        data: departmentChildrensData,
        hasNextPage: hasNextPageDepartmentChildrens,
        fetchNextPage: fetchNextPageDepartmentChildrens,
    } = companyApi.handleGetDepartmentChildrens({
        companyId: companyId.value,
        departmentId: departmentId.value,
        registered: !!props?.registeredEmployee,
    });

    const {
        data: employeesData,
        isLoading,
        hasNextPage: hasNextPageEmployees,
        fetchNextPage: fetchNextPageEmployee,
    } = companyApi.handleGetDepartmentEmployees({
        companyId: companyId.value,
        departmentId: departmentId.value,
        initialPage: 0,
        registered: props?.registeredEmployee,
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
        if (viewerData?.companies?.length) {
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
    }, [viewerData?.companies?.length]);

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

    const getDepartmentChildrens = (depId: number) => {
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

    useEffect(() => {
        if (departmentId.value) {
            const emp: any = [];
            employeesData?.pages.forEach((p) => {
                p.data.data.forEach((e: any) => {
                    emp.push(employeeProxy(e));
                });
            });
            departmentsEmployees.set((prev) => ({ ...prev, [Number(departmentId.value)]: emp }));
        }
    }, [employeesData]);

    useEffect(() => {
        if (departmentId.value) {
            const emp: any = [];
            departmentChildrensData?.pages.forEach((p) => {
                p.data.data.forEach((e: any) => {
                    emp.push(e);
                });
            });
            if (emp.length) {
                departmentChildrens.set((prev) => ({ ...prev, [Number(departmentId.value)]: emp }));
            }
        }
    }, [departmentChildrensData]);

    return {
        tabs: tabs.value,
        activeTab: activeTab.value,
        employees: searchInput.value ? searchData?.employees?.map((i) => employeeProxy(i)) || [] : getEmployeesFromDepartment() || [],
        contacts: searchInput.value ? searchData?.contacts?.map((i) => contactProxy(i)) || [] : contactsData?.map((i) => contactProxy(i)) || [],
        departmentsEmployees: departmentsEmployees.value,
        departmentChildrens: departmentChildrens.value,
        getEmployees,
        getNextPage,
        searchInput,
        getDepartments,
        getDepartmentChildrens,
        departments: departmentsData || [],
        loading: isLoading,
    };
}

export default useContacts;
export type UseContactsReturnType = ReturnType<typeof useContacts>;

import { useUpdateEffect } from 'react-use';

import { BaseTypes } from 'shared/types';

import { contactTypes } from '..';
import contacts from '../../../pages/main/contacts';
import { createMemo, useEasyState } from '../../../shared/hooks';
import { TabBarTypes } from '../../../shared/ui';
import { companyTypes } from '../../company';
import { UseTabsAndListsReturnType } from '../model/types';

type Props = {
    contacts: contactTypes.Contact[] | BaseTypes.Empty;
    companies: companyTypes.Company[] | BaseTypes.Empty;
};

const memoTabs = createMemo((companies: companyTypes.Company[] | BaseTypes.Empty) => {
    const tabs: TabBarTypes.TabBarItem[] = [{ id: 0, title: 'Личные', callback: () => '' }];
    if (companies?.length) {
        const arr: TabBarTypes.TabBarItem[] = [];
        companies.forEach((i, index) => {
            arr.push({ id: index + 1, title: i.name || '', callback: () => '' });
        });
        return tabs.concat(arr);
    }
    return tabs;
});

function useTabsAndLists(props: Props): UseTabsAndListsReturnType {
    const tabs = memoTabs(props.companies);

    const activeTab = useEasyState<TabBarTypes.TabBarItem | null>(null);
    const activeList = useEasyState<contactTypes.Contact[] | companyTypes.Company[]>([]);
    useUpdateEffect(() => {
        tabs.length && activeTab.set(tabs[0]);
        props.contacts?.length && activeList.set(props.contacts);
    }, [props.contacts, props.companies]);

    return {
        tabs,
        activeTab: activeTab.value,
        setActiveTab: activeTab.set,
        activeList: activeList.value,
    };
}

export default useTabsAndLists;

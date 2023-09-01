import { useEffect } from 'react';
import { useUpdateEffect } from 'react-use';

import { BaseTypes } from 'shared/types';

import { contactTypes } from '..';
import { createMemo, useEasyState } from '../../../shared/hooks';
import { TabBarTypes } from '../../../shared/ui';
import { companyTypes } from '../../company';
import { UseContactsTabsAndListsReturnType } from '../model/types';

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

function useContactsTabsAndLists(props: Props): UseContactsTabsAndListsReturnType {
    const tabs = memoTabs(props.companies);

    const activeTab = useEasyState<TabBarTypes.TabBarItem | null>(null);
    const activeList = useEasyState<contactTypes.Contact[] | companyTypes.Company[]>([]);

    useUpdateEffect(() => {
        if (props.contacts && activeTab.value?.title === 'Личные') {
            activeList.set(props.contacts);
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
        props.contacts?.length && activeList.set(props.contacts);
    }, [props.contacts, props.companies]);

    return {
        tabs,
        activeTab: activeTab.value,
        setActiveTab: activeTab.set,
        activeList: activeList.value,
    };
}

export default useContactsTabsAndLists;

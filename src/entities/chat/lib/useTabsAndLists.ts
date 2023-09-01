import { useEffect } from 'react';
import { useUpdateEffect } from 'react-use';

import { BaseTypes } from 'shared/types';

import { createMemo, useEasyState } from '../../../shared/hooks';
import { TabBarTypes } from '../../../shared/ui';
import { companyTypes } from '../../company';
import { ChatProxy, UseChatsTabsAndListsReturnType } from '../model/types';

type Props = {
    all: ChatProxy[] | BaseTypes.Empty;
    personal: ChatProxy[] | BaseTypes.Empty;
    company: ChatProxy[] | BaseTypes.Empty;
};

const memoTabs = createMemo((props: Props) => {
    const tabs: TabBarTypes.TabBarItem[] = [{ id: 0, title: 'все', callback: () => '' }];
    if (props.personal?.length) tabs.push({ id: 1, title: 'личные', callback: () => '' });
    // if (props.personal?.length) tabs.unshift({ id: 1, title: 'личные', callback: () => '' });
    return tabs;
});

function useChatsTabsAndLists(props: Props): UseChatsTabsAndListsReturnType {
    const tabs = memoTabs(props);

    const activeTab = useEasyState<TabBarTypes.TabBarItem | null>(null);
    const activeList = useEasyState<ChatProxy[]>([]);

    useUpdateEffect(() => {
        if (props.personal?.length && activeTab.value?.title === 'Личные') {
            activeList.set(props.personal);
        } else {
            // props.companies &&
            //     props.companies.forEach((i) => {
            //         if (i.name === activeTab.value?.title) {
            //             activeList.set([i]);
            //         }
            //     });
        }
    }, [activeTab.value]);

    useEffect(() => {
        tabs.length && activeTab.set(tabs[0]);
        props.all?.length && activeList.set(props.all);
    }, [tabs.length, props.all?.length]);

    return {
        tabs,
        activeTab: activeTab.value,
        setActiveTab: activeTab.set,
        activeList: activeList.value,
    };
}

export default useChatsTabsAndLists;

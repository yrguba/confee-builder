import { useEffect } from 'react';
import { useUpdateEffect } from 'react-use';

import { createMemo, useEasyState, useRouter } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { TabBarTypes } from 'shared/ui';

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
    const { navigate, pathname } = useRouter();
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

    const clickTab = (tab: TabBarTypes.TabBarItem) => {
        activeTab.set(tab);
        if (tab.title === 'все') return navigate('/chats/all');
        if (tab.title === 'личные') return navigate('/chats/personal');
        return navigate('/chats/company');
    };

    useEffect(() => {
        if (pathname.includes('all')) {
            tabs.length && activeTab.set(tabs[0]);
            props.all?.length && activeList.set(props.all);
        }
        if (pathname.includes('personal') && props.personal) {
            tabs.length && activeTab.set(tabs[1]);
            props.all?.length && activeList.set(props.personal);
        }
        if (pathname.includes('company') && props.company) {
            tabs.length && activeTab.set(tabs[2]);
            props.all?.length && activeList.set(props.company);
        }
    }, [tabs.length, props.all?.length, props.company?.length]);

    return {
        tabs,
        activeTab: activeTab.value,
        setActiveTab: clickTab,
        activeList: activeList.value,
    };
}

export default useChatsTabsAndLists;

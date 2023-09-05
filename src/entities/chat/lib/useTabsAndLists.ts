import { useCallback, useEffect } from 'react';
import { useUpdateEffect } from 'react-use';

import { createMemo, useEasyState, useRouter } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { TabBarTypes } from 'shared/ui';

import { companyTypes } from '../../company';
import { chatApi, chatProxy, chatTypes } from '../index';
import { ChatProxy, UseChatsTabsAndListsReturnType } from '../model/types';

type Props = {
    redirect?: boolean;
};

type MemoProps = {
    all: ChatProxy[] | BaseTypes.Empty;
    personal: ChatProxy[] | BaseTypes.Empty;
    company: ChatProxy[] | BaseTypes.Empty;
};

const memoTabs = createMemo((props: MemoProps) => {
    const tabs: TabBarTypes.TabBarItem[] = [{ id: 0, title: 'все', callback: () => '' }];
    if (props.personal?.length) tabs.push({ id: 1, title: 'личные', callback: () => '' });
    // if (props.personal?.length) tabs.unshift({ id: 1, title: 'личные', callback: () => '' });
    return tabs;
});

const memoProxy = createMemo((chats: chatTypes.Chat[] | undefined) => {
    if (chats?.length) {
        return chats.map((i) => chatProxy(i));
    }
    return [];
});

function useChatsTabsAndLists(props: Props): UseChatsTabsAndListsReturnType {
    const { navigate, pathname, params } = useRouter();

    const { redirect = true } = props;

    const { data: allChatsData } = chatApi.handleGetChats({ type: 'all' });
    const { data: personalChatsData } = chatApi.handleGetChats({ type: 'personal' });
    const { data: companyChatsData } = chatApi.handleGetChats({ type: 'company', companyId: 17 });

    const allChatsProxy = memoProxy(allChatsData);
    const personalChatsProxy = memoProxy(personalChatsData);
    const companyChatsProxy = memoProxy(companyChatsData);

    const tabs = memoTabs({ all: allChatsProxy, personal: personalChatsProxy, company: companyChatsProxy });
    const activeTab = useEasyState<TabBarTypes.TabBarItem | null>(null);
    const activeList = useEasyState<ChatProxy[] | BaseTypes.Empty>(null);

    useUpdateEffect(() => {
        if (personalChatsData?.length && activeTab.value?.title === 'личные') {
            activeList.set(personalChatsProxy);
        }
        if (allChatsProxy?.length && activeTab.value?.title === 'все') {
            activeList.set(allChatsProxy);
        }
    }, [activeTab.value]);

    const clickTab = (tab: TabBarTypes.TabBarItem) => {
        activeTab.set(tab);
        if (redirect) {
            if (tab.title === 'все') return navigate('/chats/all');
            if (tab.title === 'личные') return navigate('/chats/personal');
            return navigate('/chats/company');
        }
    };

    useEffect(() => {
        if (pathname.includes('all')) {
            tabs.length && activeTab.set(tabs[0]);
            allChatsProxy?.length && activeList.set(allChatsProxy);
        }
    }, [allChatsProxy, pathname]);

    useEffect(() => {
        if (pathname.includes('personal') && personalChatsProxy) {
            tabs.length && activeTab.set(tabs[1]);
            personalChatsProxy?.length && activeList.set(personalChatsProxy);
        }
    }, [personalChatsProxy, pathname]);

    useEffect(() => {
        if (pathname.includes('company') && companyChatsProxy) {
            tabs.length && activeTab.set(tabs[2]);
            companyChatsProxy?.length && activeList.set(companyChatsProxy);
        }
    }, [companyChatsProxy, pathname]);

    return {
        tabs,
        activeTab: activeTab.value,
        setActiveTab: clickTab,
        activeList: activeList.value,
    };
}

export default useChatsTabsAndLists;

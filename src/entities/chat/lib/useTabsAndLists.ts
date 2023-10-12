import { useCallback, useEffect } from 'react';
import { useUpdateEffect } from 'react-use';

import { createMemo, useEasyState, useRouter, useStorage } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Input, TabBarTypes } from 'shared/ui';

import chatService from './service';
import { companyApi } from '../../company';
import { Company } from '../../company/model/types';
import { viewerApi } from '../../viewer';
import { chatApi, chatProxy, chatTypes } from '../index';
import { ChatProxy, ChatsTypes, UseChatsTabsAndListsReturnType } from '../model/types';

type Props = {
    redirect?: boolean;
};

type TabPayload = { type: ChatsTypes; companyId?: number };

const memoTabs = createMemo((companies: Company[] | BaseTypes.Empty) => {
    const tabs: TabBarTypes.TabBarItem<TabPayload>[] = [
        { id: 0, title: 'Все', callback: () => '', payload: { type: 'all' } },
        { id: 1, title: 'Личные', callback: () => '', payload: { type: 'personal' } },
    ];
    companies?.forEach((i, index) => {
        tabs.push({ id: index + 2, title: i.name || '', callback: () => '', payload: { type: 'company', companyId: i.id } });
    });
    return tabs;
});

const memoChats = createMemo(chatService.getUpdatedChatsList);

function useChatsTabsAndLists(props: Props): UseChatsTabsAndListsReturnType {
    const { redirect = true } = props;

    const { navigate, pathname, params } = useRouter();
    const storage = useStorage();

    const { data: viewerData } = viewerApi.handleGetViewer();

    const activeTab = useEasyState<TabBarTypes.TabBarItem<TabPayload> | null>(null);
    const activeList = useEasyState<ChatProxy[] | BaseTypes.Empty>(null);

    const activeType = activeTab.value?.payload?.type;
    const tabs = memoTabs(viewerData?.companies);

    const searchInput = Input.use({});

    const { data: foundChats } = chatApi.handleSearchChat({ pattern: searchInput.value });

    const { data: allChatsData, hasNextPage: allHasNextPage, fetchNextPage: allFetchNextPage } = chatApi.handleGetChats({ type: activeType });
    const { data: personalChatsData, hasNextPage: personalHasNextPage, fetchNextPage: personalFetchNextPage } = chatApi.handleGetChats({ type: activeType });
    const {
        data: companyChatsData,
        hasNextPage: companyHasNextPage,
        fetchNextPage: companyFetchNextPage,
    } = chatApi.handleGetChats({ type: activeType, companyId: activeTab.value?.payload?.companyId });

    const allChatsProxy = memoChats(allChatsData);
    const personalChatsProxy = memoChats(personalChatsData);
    const companyChatsProxy = memoChats(companyChatsData);

    const getNextPage = () => {
        if (activeType === 'all' && allHasNextPage) return allFetchNextPage();
        if (activeType === 'personal' && personalHasNextPage) return personalFetchNextPage();
        if (activeType === 'company' && companyHasNextPage) return companyFetchNextPage();
    };

    useUpdateEffect(() => {
        if (personalChatsProxy?.length && activeTab.value?.title === 'Личные') {
            return activeList.set(personalChatsProxy as any);
        }
        if (allChatsProxy?.length && activeTab.value?.title === 'Все') {
            return activeList.set(allChatsProxy as any);
        }
        if (companyChatsProxy?.length) {
            activeList.set(companyChatsProxy as any);
        }
    }, [activeTab.value, companyChatsProxy]);

    const clickTab = (tab: TabBarTypes.TabBarItem<TabPayload>) => {
        activeTab.set(tab);
        storage.set('active-chats-tab', tab.payload?.companyId ? `${tab.payload?.type}/${tab.payload?.companyId}` : tab.payload?.type);
        if (redirect) {
            if (tab.title === 'Все') return navigate('/chats/all');
            if (tab.title === 'Личные') return navigate('/chats/personal');
            return navigate(`/chats/company/${tab.payload?.companyId}`);
        }
    };

    useEffect(() => {
        if (!redirect && !activeTab.value?.id) {
            tabs.length && activeTab.set(tabs[0]);
            activeList.set((allChatsProxy as any) || []);
        }
    }, [allChatsProxy]);

    useEffect(() => {
        if (pathname.includes('all') && redirect) {
            tabs.length && activeTab.set(tabs[0]);
            activeList.set((allChatsProxy as any) || []);
        }
    }, [allChatsProxy, activeTab.value, pathname]);

    useEffect(() => {
        if (pathname.includes('personal') && redirect) {
            tabs.length && activeTab.set(tabs[1]);
            activeList.set((personalChatsProxy as any) || []);
        }
    }, [personalChatsProxy, activeTab.value, pathname]);

    useEffect(() => {
        if (pathname.includes('company') && redirect) {
            const foundIndex = tabs.findIndex((i) => i.payload?.companyId === Number(params.company_id));
            tabs.length && activeTab.set(tabs[foundIndex === -1 ? 2 : foundIndex]);
            activeList.set((companyChatsProxy as any) || []);
        }
    }, [companyChatsProxy, activeTab.value, tabs.length, pathname]);

    return {
        tabs,
        activeTab: activeTab.value,
        setActiveTab: clickTab,
        activeList: activeList.value,
        getNextPage,
        searchInput,
        foundChats: foundChats?.map((i) => chatProxy(i) as any) || [],
    };
}

export default useChatsTabsAndLists;

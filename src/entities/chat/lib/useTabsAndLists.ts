import { useCallback, useEffect } from 'react';
import { useUpdateEffect } from 'react-use';

import { createMemo, useEasyState, useRouter } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { TabBarTypes } from 'shared/ui';

import chatService from './service';
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
        { id: 0, title: 'все', callback: () => '', payload: { type: 'all' } },
        { id: 1, title: 'личные', callback: () => '', payload: { type: 'personal' } },
    ];
    companies?.forEach((i, index) => {
        tabs.push({ id: index + 2, title: i.name || '', callback: () => '', payload: { type: 'company', companyId: i.id } });
    });
    return tabs;
});

const memoChats = createMemo(chatService.getUpdatedChatsList);

function useChatsTabsAndLists(props: Props): UseChatsTabsAndListsReturnType {
    const { navigate, pathname, params } = useRouter();

    const { redirect = true } = props;

    const { data: viewerData } = viewerApi.handleGetViewer();

    const activeTab = useEasyState<TabBarTypes.TabBarItem<TabPayload> | null>(null);
    const activeList = useEasyState<ChatProxy[] | BaseTypes.Empty>(null);

    const activeType = activeTab.value?.payload?.type;
    const tabs = memoTabs(viewerData?.companies);

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
        if (personalChatsProxy?.length && activeTab.value?.title === 'личные') {
            activeList.set(personalChatsProxy);
        }
        if (allChatsProxy?.length && activeTab.value?.title === 'все') {
            activeList.set(allChatsProxy);
        }
    }, [activeTab.value]);

    const clickTab = (tab: TabBarTypes.TabBarItem<TabPayload>) => {
        activeTab.set(tab);
        if (redirect) {
            if (tab.title === 'все') return navigate('/chats/all');
            if (tab.title === 'личные') return navigate('/chats/personal');
            return navigate(`/chats/company/${tab.payload?.companyId}`);
        }
    };

    useEffect(() => {
        if (!redirect && !activeTab.value?.id) {
            tabs.length && activeTab.set(tabs[0]);
            allChatsProxy?.length && activeList.set(allChatsProxy || []);
        }
    }, [allChatsProxy]);

    useEffect(() => {
        if (pathname.includes('all') && redirect) {
            tabs.length && activeTab.set(tabs[0]);
            allChatsProxy?.length && activeList.set(allChatsProxy || []);
        }
    }, [allChatsProxy, activeTab.value]);

    useEffect(() => {
        if (pathname.includes('personal') && redirect) {
            tabs.length && activeTab.set(tabs[1]);
            personalChatsProxy?.length && activeList.set(personalChatsProxy || []);
        }
    }, [personalChatsProxy, activeTab.value]);

    useEffect(() => {
        if (pathname.includes('company') && redirect) {
            const foundIndex = tabs.findIndex((i) => i.payload?.companyId === Number(params.company_id));
            tabs.length && activeTab.set(tabs[foundIndex === -1 ? 2 : foundIndex]);
            companyChatsProxy?.length && activeList.set(companyChatsProxy || []);
        }
    }, [companyChatsProxy, activeTab.value]);

    return {
        tabs,
        activeTab: activeTab.value,
        setActiveTab: clickTab,
        activeList: activeList.value,
        getNextPage,
    };
}

export default useChatsTabsAndLists;

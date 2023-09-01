import chatProxy from './lib/proxy';
import chatService from './lib/service';
import useChatsTabsAndLists from './lib/useTabsAndLists';
import chatApi from './model/api';
import chatGateway from './model/gateway';
import useChatStore from './model/store';
import * as chatTypes from './model/types';
import ChatHeaderView from './ui/header';
import ChatsListView from './ui/list';
import CreateChatModalView from './ui/modals/create';
import ChatProfileModalView from './ui/modals/profile';

export {
    chatApi,
    useChatStore,
    chatTypes,
    chatService,
    chatProxy,
    chatGateway,
    ChatHeaderView,
    ChatsListView,
    ChatProfileModalView,
    CreateChatModalView,
    useChatsTabsAndLists,
};

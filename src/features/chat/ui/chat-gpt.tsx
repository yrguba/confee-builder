import React from 'react';

import { ChatHeaderView, chatApi, chatService } from 'entities/chat';
import chatProxy from 'entities/chat/lib/proxy';
import { ChatTabsActions } from 'entities/chat/model/types';
import { useMeet } from 'entities/meet';
import { useMessageStore, messageApi } from 'entities/message';
import { useRouter } from 'shared/hooks';
import { Modal } from 'shared/ui';

import GroupChatProfileModal from './modals/profile/group';
import PrivateChatProfileModal from './modals/profile/private';
import { ForwardMessagesModal } from '../../message';

function ChatGpt() {
    const { params, navigate, pathname } = useRouter();

    return <div>ChatGpt</div>;
}
//
export default ChatGpt;

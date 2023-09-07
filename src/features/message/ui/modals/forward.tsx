import React from 'react';

import { useChatsTabsAndLists } from 'entities/chat';
import { ChatProxy } from 'entities/chat/model/types';
import { ForwardMessagesModalView, useMessageStore } from 'entities/message';
import { useRouter } from 'shared/hooks';
import { Modal, ModalTypes } from 'shared/ui';

function ForwardMessagesModal(modal: ModalTypes.UseReturnedType) {
    const { navigate } = useRouter();

    const tabsAndLists = useChatsTabsAndLists({ redirect: false });

    const forwardMessages = useMessageStore.use.forwardMessages();

    const clickOnChat = (chat: ChatProxy) => {
        if (chat.is_personal) {
            forwardMessages.set({ ...forwardMessages.value, toChatId: chat.id, redirect: true });
            modal.close();
            navigate(`/chats/personal/chat/${chat.id}`);
        }
    };

    const back = () => {
        modal.close();
        forwardMessages.clear();
    };

    return <ForwardMessagesModalView clickOnChat={clickOnChat} tabsAndLists={tabsAndLists} back={back} />;
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal {...modal}>
            <ForwardMessagesModal {...modal} />
        </Modal>
    );
}

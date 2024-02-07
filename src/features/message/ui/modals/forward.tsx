import React from 'react';

import { useChatsTabsAndLists } from 'entities/chat';
import { ChatProxy } from 'entities/chat/model/types';
import { ForwardMessagesModalView, useMessageStore } from 'entities/message';
import { useRouter } from 'shared/hooks';
import { Modal, ModalTypes } from 'shared/ui';

function ForwardMessagesModal(modal: ModalTypes.UseReturnedType) {
    const { navigate, pathname, params } = useRouter();

    const tabsAndLists = useChatsTabsAndLists({ redirect: false });

    const forwardMessages = useMessageStore.use.forwardMessages();
    const openForwardMessageModal = useMessageStore.use.openForwardMessageModal();

    const clickOnChat = (chat: ChatProxy) => {
        forwardMessages.set({ ...forwardMessages.value, toChatId: chat.id, redirect: true });
        modal.close();
        openForwardMessageModal.set(false);
        navigate(`/chats/${pathname.includes('all') ? 'all' : chat.is_personal ? 'personal' : `company/${params.company_id}`}/chat/${chat.id}`);
    };

    const back = () => {
        modal.close();
        forwardMessages.clear();
        openForwardMessageModal.set(false);
    };

    return <ForwardMessagesModalView clickOnChat={clickOnChat} tabsAndLists={tabsAndLists} back={back} />;
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal centered={false} {...modal}>
            <ForwardMessagesModal {...modal} />
        </Modal>
    );
}

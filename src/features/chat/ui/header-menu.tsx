import React from 'react';

import { ChatHeaderMenuView, ChatApi, ChatService } from 'entities/chat';
import { useModal, Modal } from 'shared/ui';

function ChatHeaderMenu() {
    const { mutate: handleExitFromChat } = ChatApi.handleExitFromChat();

    const chatId = ChatService.getOpenChatId();

    const confirmModal = useModal();

    const items: any = [
        { id: 0, icon: 'settings', title: 'Редактировать группу', action: () => console.log('Редактировать группу') },
        { id: 1, icon: 'trash', title: 'Удалить и покинуть', action: confirmModal.open },
    ];

    const exitFromChat = () => {
        handleExitFromChat(
            { chatId },
            {
                onSuccess: () => {
                    window.location.reload();
                },
            }
        );
    };

    return (
        <>
            <ChatHeaderMenuView items={items} />
            <Modal {...confirmModal} onOk={exitFromChat}>
                Вы точно хотите удалить всю историю и выйти из группы?
            </Modal>
        </>
    );
}

export default ChatHeaderMenu;

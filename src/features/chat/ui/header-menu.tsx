import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ChatHeaderMenuView, ChatApi, ChatService } from 'entities/chat';
import { EditGroupChatModal } from 'entities/modal';
import { useModal, Modal } from 'shared/ui';

function ChatHeaderMenu() {
    const navigate = useNavigate();

    const { mutate: handleExitFromChat } = ChatApi.handleExitFromChat();
    const { mutate: handleEditName } = ChatApi.handleEditName();
    const { mutate: handleAddAvatar } = ChatApi.handleAddAvatar();

    const chatId = ChatService.getOpenChatId();

    const confirmModal = useModal();
    const editChatModal = useModal();

    const items: any = [
        { id: 0, icon: 'settings', title: 'Редактировать группу', action: editChatModal.open },
        { id: 1, icon: 'trash', title: 'Удалить и покинуть', action: confirmModal.open },
    ];

    const exitFromChat = () => {
        handleExitFromChat(
            { chatId },
            {
                onSuccess: () => {
                    navigate('/main/chats');
                    window.location.reload();
                },
            }
        );
    };

    const editChat = (data: { name: string | null; avatar: FormData | null }) => {
        if (!chatId) return;
        if (data.name) {
            handleEditName({
                chatId,
                name: data.name,
            });
        }
        if (data.avatar) {
            handleAddAvatar({
                chatId,
                avatar: data.avatar,
            });
        }
        editChatModal.close();
    };

    return (
        <>
            <ChatHeaderMenuView openModal={confirmModal.isOpen || editChatModal.isOpen} items={items} />
            <Modal closeIcon={false} {...confirmModal} onOk={exitFromChat} okText="Удалить" okStyle={{ backgroundColor: 'var(--red)' }}>
                Вы точно хотите удалить всю историю и выйти из группы?
            </Modal>
            <Modal {...editChatModal} headerText="Редактирование группы" okText="Сохранить">
                <EditGroupChatModal chat={ChatService.getChatInList(chatId)} editChat={editChat} />
            </Modal>
        </>
    );
}

export default ChatHeaderMenu;

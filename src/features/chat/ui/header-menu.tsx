import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ChatHeaderMenuView, ChatApi, ChatService, useChatStore } from 'entities/chat';
import { EditGroupChatModal } from 'entities/modal';
import { useModal, Modal } from 'shared/ui';

function ChatHeaderMenu() {
    const navigate = useNavigate();

    const { mutate: handleDeleteChat } = ChatApi.handleDeleteChat();
    const { mutate: handleEditName } = ChatApi.handleEditName();
    const { mutate: handleAddAvatar } = ChatApi.handleAddAvatar();

    const setVisibleHeaderMenu = useChatStore.use.setVisibleHeaderMenu();

    const chatId = ChatService.getOpenChatId();
    const openChat = ChatService.getChatInList(Number(chatId));

    const confirmModal = useModal();
    const editChatModal = useModal();

    const itemsGroupChat: any = [
        { id: 0, icon: 'settings', title: 'Редактировать группу', action: editChatModal.open },
        { id: 1, icon: 'trash', title: 'Удалить и покинуть', action: confirmModal.open },
    ];

    const itemsPrivateChat: any = [{ id: 0, icon: 'trash', title: 'Удалить чат', action: confirmModal.open }];

    const deleteChat = () => {
        handleDeleteChat(
            { chatId },
            {
                onSuccess: () => {
                    navigate('/main/chats');
                    setVisibleHeaderMenu(false);
                    // window.location.reload();
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
            <ChatHeaderMenuView openModal={confirmModal.isOpen || editChatModal.isOpen} items={openChat?.is_group ? itemsGroupChat : itemsPrivateChat} />
            {/* <Modal closeIcon={false} {...confirmModal} onOk={deleteChat} okText="Удалить" okStyle={{ backgroundColor: 'var(--red)' }}> */}
            {/*    {openChat?.is_group ? 'Вы точно хотите удалить всю историю и выйти из группы?' : 'Вы точно хотите удалить чат?'} */}
            {/* </Modal> */}
            {/* <Modal {...editChatModal} okText="Сохранить"> */}
            {/*    <EditGroupChatModal chat={ChatService.getChatInList(chatId)} editChat={editChat} /> */}
            {/* </Modal> */}
        </>
    );
}

export default ChatHeaderMenu;

import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { ChatListView, ChatApi, ChatTypes, ChatService, useChatStore } from 'entities/chat';
import { CreatePrivateChatModal } from 'entities/modal';
import { UserTypes, UserApi } from 'entities/user';
import { ViewerService } from 'entities/viewer';
import { useModal, Modal } from 'shared/ui';

function ChatsList() {
    const navigate = useNavigate();
    const params = useParams();

    const viewer = ViewerService.getViewer();

    const createPrivateChatModal = useModal();

    const socketAction = useChatStore.use.socketAction();

    const { data: usersData } = UserApi.handleGetUsers();

    const { data: chatData } = ChatApi.handleGetChats();
    const { mutate: handleCreateChat, isSuccess } = ChatApi.handleCreateChat();

    const clickOnChatCard = (chat: ChatTypes.Chat) => {
        const { id, is_group } = chat;
        if (Number(params.chat_id) !== id) {
            if (ChatService.checkIsOpenChatInfo()) {
                if (is_group) {
                    return navigate(`/main/chats/chat/${id}/group_chat/${id}/users`);
                }
                const userId = chat.users.find((userId) => userId !== viewer?.id);
                return navigate(`/main/chats/chat/${id}/private_chat/${userId}/images`);
            }
            navigate(`/main/chats/chat/${id}`);
        }
    };

    const openCreateChatModal = (name: string) => {
        if (name === 'Личные чаты') return createPrivateChatModal.open();
    };

    const createPrivateChat = (user: UserTypes.User) => {
        handleCreateChat(
            {
                name: user.name,
                users: [user.id],
                is_group: false,
            },
            {
                onSuccess: (data) => {
                    createPrivateChatModal.close();
                    if (params.chat_id) {
                        navigate(`/main/chats/chat/${data.data.data.id}`);
                    } else {
                        navigate(`chat/${data.data.data.id}`);
                    }
                },
            }
        );
    };

    return (
        <>
            <ChatListView
                createChat={openCreateChatModal}
                chats={chatData?.data || []}
                clickOnChat={clickOnChatCard}
                activeChatId={Number(params.chat_id) || null}
            />
            <Modal footer={false} headerText="Создание чата" {...createPrivateChatModal}>
                <CreatePrivateChatModal users={usersData?.data?.data || []} userClick={createPrivateChat} />
            </Modal>
        </>
    );
}

export default ChatsList;

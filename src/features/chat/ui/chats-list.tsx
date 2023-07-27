import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { ChatListView, ChatApi, ChatTypes, ChatService, useChatStore } from 'entities/chat';
import { UserTypes, UserApi } from 'entities/user';
import { ViewerService } from 'entities/viewer';
import { useModal, Modal } from 'shared/ui';

import ChatProxy from '../../../entities/chat/lib/chat-proxy';

function ChatsList() {
    const navigate = useNavigate();
    const params = useParams();

    const viewer = ViewerService.getViewer();

    const createPrivateChatModal = useModal();
    const createGroupChatModal = useModal();

    useChatStore.use.socketAction();

    const { data: usersData } = UserApi.handleGetUsers();
    const openChatInfo = useChatStore.use.openChatInfo();

    const { data: chatsData } = ChatApi.handleGetChats();
    const { mutate: handleCreateChat, isSuccess, isLoading: loadingCreateGroupChat } = ChatApi.handleCreateChat();
    const { mutate: handleAddAvatar } = ChatApi.handleAddAvatar();

    const clickOnChatCard = (chat: ChatTypes.Chat) => {
        const { id, is_group } = chat;
        if (Number(params.chat_id) !== id) {
            if (openChatInfo) {
                if (is_group) {
                    return navigate(`/chats/chat/${id}/group_chat/${id}/users`);
                }
                const userId = chat.members.find((member) => member.id !== viewer?.id);
                return navigate(`/chats/chat/${id}/private_chat/${userId}/images`);
            }
            navigate(`/chats/chat/${id}`);
        }
    };

    const openCreateChatModal = (name: string) => {
        if (name === 'Личные чаты') return createPrivateChatModal.open();
        if (name === 'Групповые чаты') return createGroupChatModal.open();
    };

    const createPrivateChat = (user: UserTypes.User) => {
        handleCreateChat(
            {
                name: '',
                users: [user.id],
                is_group: false,
            },
            {
                onSuccess: (data) => {
                    createPrivateChatModal.close();
                    if (params.chat_id) {
                        navigate(`/chats/chat/${data.data.data.id}`);
                    } else {
                        navigate(`chat/${data.data.data.id}`);
                    }
                },
            }
        );
    };

    const createGroupChat = (data: { name: string; avatar: FormData | null; users: number[] }) => {
        handleCreateChat(
            {
                name: data.name,
                users: data.users,
                is_group: true,
            },
            {
                onSuccess: (res) => {
                    if (data.avatar) {
                        handleAddAvatar({
                            chatId: res.data.data.id,
                            avatar: data.avatar,
                        });
                    }
                    createGroupChatModal.close();
                    if (params.chat_id) {
                        navigate(`/chats/chat/${res.data.data.id}`);
                    } else {
                        navigate(`chat/${res.data.data.id}`);
                    }
                },
            }
        );
    };

    return (
        <>
            <ChatListView
                createChat={openCreateChatModal}
                chats={chatsData?.data?.map((chat) => ChatProxy(chat)) || []}
                clickOnChat={clickOnChatCard}
                activeChatId={Number(params.chat_id) || null}
            />
        </>
    );
}

export default ChatsList;

import React, { useEffect } from 'react';

import { chatApi, chatProxy, ChatProfileModalView, chatTypes } from 'entities/chat';
import { messageTypes } from 'entities/message';
import { useRouter, useList, useUpdateEffect } from 'shared/hooks';
import { Modal, ModalTypes, Notification } from 'shared/ui';

function ChatProfileModal(chatProfileModal: ModalTypes.UseReturnedType) {
    const { params, navigate } = useRouter();
    const chatId = Number(params.chat_id);

    const mediaList = useList<messageTypes.MediaContentType | null>([
        { id: 'Фото', payload: 'images', element: <div>Медиа</div> },
        { id: 'Видео', payload: 'videos', element: <div>Медиа</div> },
        { id: 'Аудио', payload: 'audios', element: <div>Аудио</div> },
        { id: 'Файлы', payload: 'documents', element: <div>Файлы</div> },
    ]);

    const { data: chatData } = chatApi.handleGetChat({ chatId });
    const { mutate: handleDeleteChat } = chatApi.handleDeleteChat();
    const { data: handleGetChatFiles } = chatApi.handleGetChatFiles({ chatId, filesType: mediaList.activeItem.payload });

    const notification = Notification.use();

    const actions = (action: chatTypes.Actions) => {
        switch (action) {
            case 'audioCall':
                return notification.inDev();
            case ' videoCall':
                return notification.inDev();
            case 'delete':
                return handleDeleteChat(
                    { chatId },
                    {
                        onSuccess: () => {
                            chatProfileModal.close();
                            navigate('/chats');
                        },
                    }
                );
        }
    };

    useEffect(() => {
        if (chatData?.is_group) {
            mediaList.push({ id: 'Участники', payload: null, element: <div>members</div> });
        }
    }, [chatData?.is_group]);

    useUpdateEffect(() => {
        switch (mediaList.activeItem.payload) {
            case 'audios':
                mediaList.updateElement(mediaList.activeItem.id, <div>wdadwdad</div>);
        }
    }, [handleGetChatFiles]);

    return <ChatProfileModalView chat={chatProxy(chatData)} actions={actions} mediaList={mediaList} />;
}

export default function (chatProfileModal: ModalTypes.UseReturnedType) {
    return (
        <Modal {...chatProfileModal}>
            <ChatProfileModal {...chatProfileModal} />
        </Modal>
    );
}

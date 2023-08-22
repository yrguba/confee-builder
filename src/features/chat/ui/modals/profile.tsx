import React from 'react';

import { chatApi, chatProxy, ChatProfileModalView, chatTypes } from 'entities/chat';
import { useRouter, useList } from 'shared/hooks';
import { Modal, ModalTypes, Notification } from 'shared/ui';

function ChatProfileModal(chatProfileModal: ModalTypes.UseReturnedType) {
    const { params, navigate } = useRouter();
    const chatId = Number(params.chat_id);
    const { data: chatData } = chatApi.handleGetChat({ chatId });
    const { mutate: handleDeleteChat } = chatApi.handleDeleteChat();

    const notification = Notification.use();

    const mediaList = useList([
        { id: 'Медиа', element: <div>Медиа</div> },
        { id: 'Аудио', element: <div>Аудио</div> },
        { id: 'Файлы', element: <div>Файлы</div> },
    ]);

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

    return <ChatProfileModalView chat={chatProxy(chatData)} actions={actions} mediaList={mediaList} />;
}

export default function (chatProfileModal: ModalTypes.UseReturnedType) {
    return (
        <Modal {...chatProfileModal}>
            <ChatProfileModal {...chatProfileModal} />
        </Modal>
    );
}

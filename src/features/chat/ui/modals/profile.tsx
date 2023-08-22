import React, { useEffect } from 'react';

import { chatApi, chatProxy, ChatProfileModalView, chatTypes } from 'entities/chat';
import { messageTypes } from 'entities/message';
import { useRouter, useList, useUpdateEffect, useEasyState } from 'shared/hooks';
import { Modal, ModalTypes, Notification, Card } from 'shared/ui';

function ChatProfileModal(chatProfileModal: ModalTypes.UseReturnedType) {
    const { params, navigate } = useRouter();
    const chatId = Number(params.chat_id);

    const { data: chatData } = chatApi.handleGetChat({ chatId });
    const { mutate: handleDeleteChat } = chatApi.handleDeleteChat();

    const mediaTypes = useEasyState<messageTypes.MediaContentType | null>(chatData?.is_group ? 'images' : null);

    const { data: handleGetChatFiles } = chatApi.handleGetChatFiles({ chatId, filesType: mediaTypes.value });

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

    return <ChatProfileModalView chat={chatProxy(chatData)} actions={actions} mediaTypes={mediaTypes} />;
}

export default function (chatProfileModal: ModalTypes.UseReturnedType) {
    return (
        <Modal {...chatProfileModal}>
            <ChatProfileModal {...chatProfileModal} />
        </Modal>
    );
}

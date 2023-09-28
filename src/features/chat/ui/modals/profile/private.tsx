import React from 'react';

import { chatApi, chatProxy, chatTypes, PrivateChatProfileModalView } from 'entities/chat';
import { EmployeeProxy } from 'entities/company/model/types';
import { messageTypes } from 'entities/message';
import { UserProxy } from 'entities/user/model/types';
import { useRouter, useEasyState } from 'shared/hooks';
import { Modal, ModalTypes, Notification } from 'shared/ui';

function PrivateChatProfileModal(modal: ModalTypes.UseReturnedType<{ user?: UserProxy; employee?: EmployeeProxy }>) {
    const { navigate, pathname } = useRouter();
    const { user } = modal.payload;
    const { employee } = modal.payload;

    const { data: chatData } = chatApi.handleGetChatWithUser({ userId: user?.id });
    const proxyChat = chatProxy(chatData);

    const mediaTypes = useEasyState<messageTypes.MediaContentType | null>(!chatData?.is_group ? 'images' : null);

    const { data: filesData } = chatApi.handleGetChatFiles({ chatId: proxyChat?.id, filesType: mediaTypes.value });

    const { mutate: handleDeleteChat } = chatApi.handleDeleteChat();

    const notification = Notification.use();

    const confirmDeleteChat = Modal.useConfirm((value) => {
        if (value && proxyChat?.id) {
            handleDeleteChat(
                { chatId: proxyChat?.id },
                {
                    onSuccess: () => {
                        modal.close();
                        navigate(`/chats/${pathname.split('/')[2]}`);
                    },
                }
            );
        }
    });

    const actions = (action: chatTypes.Actions) => {
        switch (action) {
            case 'audioCall':
                return notification.inDev();
            case 'videoCall':
                return notification.inDev();
            case 'delete':
                return confirmDeleteChat.open();
        }
    };

    return (
        <>
            <Modal.Confirm {...confirmDeleteChat} okText="Удалить" title="Удалить чат" />
            <PrivateChatProfileModalView
                user={user}
                employee={employee}
                clickAvatar={() => ''}
                chat={chatProxy(chatData)}
                actions={actions}
                mediaTypes={mediaTypes}
                files={filesData}
            />
        </>
    );
}

export default function (modal: ModalTypes.UseReturnedType<{ user?: UserProxy; employee?: EmployeeProxy }>) {
    return (
        <Modal {...modal}>
            <PrivateChatProfileModal {...modal} />
        </Modal>
    );
}

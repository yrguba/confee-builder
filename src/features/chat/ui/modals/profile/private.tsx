import React from 'react';

import { chatApi, chatProxy, chatTypes, PrivateChatProfileModalView } from 'entities/chat';
import { EmployeeProxy } from 'entities/company/model/types';
import { messageTypes } from 'entities/message';
import { UserProxy } from 'entities/user/model/types';
import { useRouter, useEasyState } from 'shared/hooks';
import { Modal, ModalTypes, Notification } from 'shared/ui';

import { viewerService } from '../../../../../entities/viewer';

function PrivateChatProfileModal(modal: ModalTypes.UseReturnedType<{ user?: UserProxy; employee?: EmployeeProxy }>) {
    const { navigate, pathname, params } = useRouter();

    const viewerId = viewerService.getId();
    const { user } = modal.payload;
    const { employee } = modal.payload;

    const { data: chatData } = chatApi.handleGetChatWithUser({ userId: user?.id });
    const proxyChat = chatProxy(chatData);

    const mediaTypes = useEasyState<messageTypes.MediaContentType | null>(!chatData?.is_group ? 'images' : null);

    const { data: filesData } = chatApi.handleGetChatFiles({ chatId: proxyChat?.id, filesType: mediaTypes.value });

    const { mutate: handleCreatePersonalChat } = chatApi.handleCreatePersonalChat();
    const { mutate: handleCreateCompanyChat } = chatApi.handleCreateCompanyChat();
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

    const actions = (action: chatTypes.PrivateChatActions) => {
        switch (action) {
            case 'audioCall':
                return notification.inDev();
            case 'videoCall':
                return notification.inDev();
            case 'message':
                const redirect = (chatId?: number) => navigate(`/chats/${user ? 'personal' : `company/${params.company_id}`}/chat/${chatId}`);
                if (!proxyChat) {
                    if (user) {
                        handleCreatePersonalChat({ user_ids: [user.id], is_group: false }, { onSuccess: (data) => redirect(data.data.data.id) });
                    } else {
                        employee &&
                            handleCreateCompanyChat(
                                { companyId: params.company_id, body: { employee_ids: [employee?.id], is_group: false } },
                                { onSuccess: (data) => redirect(data.data.data.id) }
                            );
                    }
                } else {
                    return redirect(proxyChat?.id);
                }
                return modal.close();
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
                visibleChatBtn={String(proxyChat?.id) !== params.chat_id}
                visibleBtns={user?.id !== viewerId}
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

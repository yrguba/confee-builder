import React from 'react';

import { chatApi, chatProxy, chatService, chatTypes, PrivateChatProfileModalView } from 'entities/chat';
import { EmployeeProxy } from 'entities/company/model/types';
import { useMeet } from 'entities/meet';
import { messageDictionaries, messageTypes } from 'entities/message';
import { UserProxy } from 'entities/user/model/types';
import { viewerService } from 'entities/viewer';
import { useRouter, useEasyState, useWebView } from 'shared/hooks';
import { Modal, ModalTypes, Notification } from 'shared/ui';

function PrivateChatProfileModal(modal: ModalTypes.UseReturnedType<{ user?: UserProxy; employee?: EmployeeProxy }>) {
    const { navigate, pathname, params } = useRouter();

    const viewerId = viewerService.getId();
    const { user, employee } = modal.payload;

    const { data: chatData } = chatApi.handleGetChat({ chatId: params.chat_id });

    const proxyChat = chatProxy(chatData?.data.data);

    const getMembersIdsWithoutMe = chatService.getMembersIdsWithoutMe(proxyChat);

    const notification = Notification.use();

    const mediaTypes = useEasyState<messageTypes.MediaContentType | null>('images');

    const { data: filesData } = chatApi.handleGetChatFiles({ chatId: proxyChat?.id, filesType: mediaTypes.value });
    const { mutate: handleCreatePersonalChat } = chatApi.handleCreatePersonalChat();
    const { mutate: handleCreateCompanyChat } = chatApi.handleCreateCompanyChat();
    const { mutate: handleDeleteChat } = chatApi.handleDeleteChat();
    const { mutate: handleChatMute } = chatApi.handleChatMute();

    const { createMeet } = useMeet();

    const confirmDeleteChat = Modal.useConfirm((value) => {
        if (value && proxyChat?.id) {
            handleDeleteChat(
                { type: proxyChat.is_personal ? 'personal' : 'company', chatId: proxyChat?.id, companyId: params.company_id },
                {
                    onSuccess: () => {
                        modal.close();
                        navigate(`/chats/${pathname.split('/')[2]}${params.company_id ? `/${params.company_id}` : ''}`);
                    },
                }
            );
        }
    });

    const actions = (action: chatTypes.PrivateChatActions) => {
        switch (action) {
            case 'goMeet':
                if (proxyChat?.isDeleted) {
                    return notification.success({
                        title: `Нельзя создать конфиренцию, пользователь удаден.`,
                        system: true,
                    });
                }
                return createMeet(proxyChat?.id, getMembersIdsWithoutMe);
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
            case 'mute':
                if (proxyChat) {
                    return handleChatMute({ chatId: proxyChat?.id, value: !proxyChat?.is_muted });
                }
        }
    };

    return (
        <>
            <Modal.Confirm {...confirmDeleteChat} okText="Удалить" title="Удалить чат" />
            <PrivateChatProfileModalView
                user={user}
                employee={employee}
                clickAvatar={() => ''}
                chat={proxyChat}
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
        <Modal {...modal} centered={false}>
            <PrivateChatProfileModal {...modal} />
        </Modal>
    );
}

import React from 'react';

import { chatApi, chatProxy, chatTypes, PrivateChatProfileModalView } from 'entities/chat';
import { EmployeeProxy } from 'entities/company/model/types';
import { messageTypes } from 'entities/message';
import { UserProxy } from 'entities/user/model/types';
import { viewerService } from 'entities/viewer';
import { useRouter, useEasyState, useWebView } from 'shared/hooks';
import { Modal, ModalTypes, Notification } from 'shared/ui';

import { appService } from '../../../../../entities/app';
import { meetApi } from '../../../../../entities/meet';
import { getRandomString } from '../../../../../shared/lib';

function PrivateChatProfileModal(modal: ModalTypes.UseReturnedType<{ user?: UserProxy; employee?: EmployeeProxy }>) {
    const { navigate, pathname, params } = useRouter();

    const viewerId = viewerService.getId();
    const { user, employee } = modal.payload;

    const { data: useChatData } = chatApi.handleGetChatWithUser({ userId: user?.id });
    const { data: employeeChatData } = chatApi.handleGetChatWithEmployee({ employeeId: employee?.id });

    const proxyChat = chatProxy(useChatData || employeeChatData);

    const mediaTypes = useEasyState<messageTypes.MediaContentType | null>('images');

    const { data: filesData } = chatApi.handleGetChatFiles({ chatId: proxyChat?.id, filesType: mediaTypes.value });

    const { mutate: handleCreatePersonalChat } = chatApi.handleCreatePersonalChat();
    const { mutate: handleCreateCompanyChat } = chatApi.handleCreateCompanyChat();
    const { mutate: handleDeleteChat } = chatApi.handleDeleteChat();
    const { mutate: handleCreateMeeting } = meetApi.handleCreateMeeting();

    const notification = Notification.use();

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

    const webView = useWebView({
        id: 'meet',
        title: `Конференция`,
        onClose: () => {},
    });

    const goMeet = async () => {
        const meetId = getRandomString(30);
        if (webView?.isOpen() || params.meet_id) {
            notification.info({ title: 'Сначала покиньте текущую конференцию', system: true });
        } else if (meetId && proxyChat?.secondUser?.id) {
            handleCreateMeeting({ chatId: proxyChat?.id, confee_video_room: meetId, target_user_id: proxyChat?.secondUser?.id });
            if (appService.tauriIsRunning) {
                webView?.open(`/meet/${meetId}`);
            } else {
                navigate(`/meet/${meetId}`);
            }
        }
    };

    const actions = (action: chatTypes.PrivateChatActions) => {
        switch (action) {
            case 'goMeet':
                return goMeet();
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

import React from 'react';
import { useUpdateEffect } from 'react-use';
import useFileUploader from 'react-use-file-uploader';

import { useCall } from 'entities/call';
import { chatApi, chatProxy, GroupChatProfileModalView, chatTypes, chatService } from 'entities/chat';
import { messageTypes } from 'entities/message';
import { useRouter, useEasyState } from 'shared/hooks';
import { Modal, ModalTypes } from 'shared/ui';

import PrivateChatProfileModal from './private';
import { viewerStore } from '../../../../../entities/viewer';
import { debounce, getRandomString } from '../../../../../shared/lib';
import { EditChatModal } from '../../../index';
import AddMembersInChatModal from '../add-members';

function GroupChatProfileModal(modal: ModalTypes.UseReturnedType) {
    const { params, navigate, pathname } = useRouter();

    const chatId = Number(params.chat_id);

    const visibleSwiper = useEasyState(false);

    const { data: chatData } = chatApi.handleGetChat({ chatId });
    const proxyChat = chatProxy(chatData?.data.data);
    const getMembersIdsWithoutMe = chatService.getMembersIdsWithoutMe(proxyChat);

    const { mutate: handleLeaveChat } = chatApi.handleLeaveChat();

    const { mutate: handleRemoveMemberFromCompany } = chatApi.handleRemoveMemberFromCompany();
    const { mutate: handleRemoveMemberFromPersonal } = chatApi.handleRemoveMemberFromPersonal();
    const { mutate: handleChatMute } = chatApi.handleChatMute();

    const mediaTypes = useEasyState<messageTypes.MediaContentType | null>(null);

    const { data: filesData } = chatApi.handleGetChatFiles({ chatId, filesType: mediaTypes.value });

    const call = useCall();

    const addMembersModal = Modal.use();
    const privateChatProfileModal = Modal.use();
    const editChatModal = Modal.use();

    const confirmRemoveMember = Modal.useConfirm<number>((value, memberId) => {
        if (value && memberId) {
            if (proxyChat?.is_personal) {
                handleRemoveMemberFromPersonal({ user_ids: [memberId], chatId });
            } else {
                handleRemoveMemberFromCompany({ employee_ids: [memberId], chatId });
            }
        }
    });

    const confirmLeaveChat = Modal.useConfirm((value, callbackData) => {
        if (value) {
            const exitChat = () => {
                navigate(`/chats/${pathname.split('/')[2]}${params.company_id ? `/${params.company_id}` : ''}`);
            };
            handleLeaveChat({ type: proxyChat?.is_personal ? 'personal' : 'company', chatId, companyId: params.company_id }, { onSuccess: exitChat });
        }
    });

    const removeMember = (id: number, name: string) => {
        confirmRemoveMember.open(id, { title: `Удалить ${name} из чата` });
    };

    const actions = (action: chatTypes.GroupChatActions) => {
        switch (action) {
            case 'goMeet':
                return call.openCreateMeet(proxyChat);
            case 'leave':
                return confirmLeaveChat.open(null, {
                    okText: proxyChat?.is_group ? 'Покинуть' : 'Удалить',
                    title: proxyChat?.is_group ? 'Покинуть чат' : 'Удалить чат',
                });
            case 'add-members':
                return addMembersModal.open();
            case 'mute':
                return handleChatMute({ chatId, value: !proxyChat?.is_muted, companyId: proxyChat?.company_id || null });
            case 'open-edit':
                return editChatModal.open();
        }
    };

    useUpdateEffect(() => {
        modal.close();
        privateChatProfileModal.close();
    }, [params.chat_id]);

    return (
        <>
            <EditChatModal {...editChatModal} />
            <PrivateChatProfileModal {...privateChatProfileModal} />
            <AddMembersInChatModal {...addMembersModal} />
            <Modal.Confirm {...confirmLeaveChat} />
            <Modal.Confirm {...confirmRemoveMember} okText="Удалить" />
            <GroupChatProfileModalView
                removeMember={removeMember}
                clickAvatar={() => visibleSwiper.set(true)}
                chat={proxyChat}
                actions={actions}
                mediaTypes={mediaTypes}
                files={filesData}
                clickUser={privateChatProfileModal.open}
            />
        </>
    );
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal {...modal} centered={false}>
            <GroupChatProfileModal {...modal} />
        </Modal>
    );
}

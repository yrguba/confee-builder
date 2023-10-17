import React, { useState } from 'react';
import { useUpdateEffect } from 'react-use';
import useFileUploader from 'react-use-file-uploader';

import { chatApi, chatProxy, GroupChatProfileModalView, chatTypes } from 'entities/chat';
import { messageTypes } from 'entities/message';
import { viewerService } from 'entities/viewer';
import { useRouter, useEasyState, UseFileUploaderTypes } from 'shared/hooks';
import { Modal, ModalTypes, Notification } from 'shared/ui';

import PrivateChatProfileModal from './private';
import { EmployeeProxy } from '../../../../../entities/company/model/types';
import { UserProxy } from '../../../../../entities/user/model/types';
import ChatAvatarsSwiper from '../../avatars-swiper';
import AddMembersInChatModal from '../add-members';

function GroupChatProfileModal(modal: ModalTypes.UseReturnedType<{ chatId: number }>) {
    const { params, navigate, pathname } = useRouter();

    const viewerId = viewerService.getId();
    const { chatId } = modal.payload;

    const visibleSwiper = useEasyState(false);

    const { data: chatData } = chatApi.handleGetChat({ chatId });
    const proxyChat = chatProxy(chatData);

    const { mutate: handleLeaveChat } = chatApi.handleLeaveChat();

    const { mutate: handleAddAvatar } = chatApi.handleAddAvatar();
    const { mutate: handleUpdateChatName } = chatApi.handleUpdateChatName();
    const { mutate: handleRemoveMemberFromCompany } = chatApi.handleRemoveMemberFromCompany();
    const { mutate: handleRemoveMemberFromPersonal } = chatApi.handleRemoveMemberFromPersonal();
    const { mutate: handleDeleteChat } = chatApi.handleDeleteChat();

    const mediaTypes = useEasyState<messageTypes.MediaContentType | null>(null);

    const { data: filesData } = chatApi.handleGetChatFiles({ chatId, filesType: mediaTypes.value });

    const notification = Notification.use();

    const addMembersModal = Modal.use();
    const privateChatProfileModal = Modal.use();
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

    const confirmAddAvatar = Modal.useConfirm<{ img: string }>((value, callbackData) => {
        value &&
            callbackData?.img &&
            handleAddAvatar({
                chatId,
                img: callbackData.img,
            });
    });

    const { open: selectFile } = useFileUploader({
        accept: 'image',
        onAfterUploading: (data) => {
            confirmAddAvatar.open({ img: data.files[0].fileUrl });
        },
    });

    const getScreenshot = (data: string) => handleAddAvatar({ chatId, img: data });
    const updateChatName = (name: string) => handleUpdateChatName({ chatId, name });

    const removeMember = (id: number, name: string) => {
        confirmRemoveMember.open(id, { title: `Удалить ${name} из чата` });
    };

    const actions = (action: chatTypes.GroupChatActions) => {
        switch (action) {
            case 'audioCall':
                return notification.inDev();
            case 'videoCall':
                return notification.inDev();
            case 'leave':
                return confirmLeaveChat.open(null, {
                    okText: proxyChat?.is_group ? 'Покинуть' : 'Удалить',
                    title: proxyChat?.is_group ? 'Покинуть чат' : 'Удалить чат',
                });
            case 'add-members':
                addMembersModal.open();
        }
    };

    useUpdateEffect(() => {
        modal.close();
        privateChatProfileModal.close();
    }, [params.chat_id]);

    return (
        <>
            <PrivateChatProfileModal {...privateChatProfileModal} />
            <AddMembersInChatModal {...addMembersModal} />
            <ChatAvatarsSwiper visible={visibleSwiper.value} chatId={chatId} onClose={() => visibleSwiper.set(false)} />
            <Modal.Confirm {...confirmLeaveChat} />
            <Modal.Confirm {...confirmRemoveMember} okText="Удалить" />
            <Modal.Confirm {...confirmAddAvatar} okText="Установить" title="Установить аватар" />
            <GroupChatProfileModalView
                removeMember={removeMember}
                clickAvatar={() => visibleSwiper.set(true)}
                getScreenshot={getScreenshot}
                selectFile={selectFile}
                chat={chatProxy(chatData)}
                actions={actions}
                mediaTypes={mediaTypes}
                files={filesData}
                updateChatName={updateChatName}
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

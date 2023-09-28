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

    const { mutate: handleLeaveChat } = chatApi.handleLeaveChat();
    const { mutate: handleAddAvatar } = chatApi.handleAddAvatar();
    const { mutate: handleUpdateChatName } = chatApi.handleUpdateChatName();

    const mediaTypes = useEasyState<messageTypes.MediaContentType | null>(!chatData?.is_group ? 'images' : null);

    const { data: filesData } = chatApi.handleGetChatFiles({ chatId, filesType: mediaTypes.value });

    const notification = Notification.use();

    const addMembersModal = Modal.use();
    const privateChatProfileModal = Modal.use();

    const confirmLeaveChat = Modal.useConfirm<{ img: string }>((value, callbackData) => {
        value &&
            handleLeaveChat(
                { chatId },
                {
                    onSuccess: () => {
                        modal.close();
                        navigate(`/chats/${pathname.split('/')[2]}`);
                    },
                }
            );
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

    const actions = (action: chatTypes.GroupChatActions) => {
        switch (action) {
            case 'audioCall':
                return notification.inDev();
            case 'videoCall':
                return notification.inDev();
            case 'leave':
                return confirmLeaveChat.open();
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
            <Modal.Confirm {...confirmLeaveChat} okText="Покинуть" title="Покинуть чат" />
            <Modal.Confirm {...confirmAddAvatar} okText="Установить" title="Установить аватар" />
            <GroupChatProfileModalView
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
        <Modal {...modal}>
            <GroupChatProfileModal {...modal} />
        </Modal>
    );
}

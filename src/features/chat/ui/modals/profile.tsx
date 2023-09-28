import React, { useState } from 'react';
import useFileUploader from 'react-use-file-uploader';

import { chatApi, chatProxy, ChatProfileModalView, chatTypes } from 'entities/chat';
import { messageTypes } from 'entities/message';
import { useRouter, useEasyState, UseFileUploaderTypes } from 'shared/hooks';
import { Modal, ModalTypes, Notification } from 'shared/ui';

import AddMembersInChatModal from './add-members';
import { UserProfileModal } from '../../../user';
import ChatAvatarsSwiper from '../avatars-swiper';

function ChatProfileModal(modal: ModalTypes.UseReturnedType) {
    const { params, navigate, pathname } = useRouter();
    const chatId = Number(params.chat_id);

    const visibleSwiper = useEasyState(false);

    const { data: chatData } = chatApi.handleGetChat({ chatId });
    const { mutate: handleDeleteChat } = chatApi.handleDeleteChat();
    const { mutate: handleLeaveChat } = chatApi.handleLeaveChat();
    const { mutate: handleAddAvatar } = chatApi.handleAddAvatar();
    const { mutate: handleUpdateChatName } = chatApi.handleUpdateChatName();

    const mediaTypes = useEasyState<messageTypes.MediaContentType | null>(!chatData?.is_group ? 'images' : null);

    const { data: filesData } = chatApi.handleGetChatFiles({ chatId, filesType: mediaTypes.value });

    const notification = Notification.use();

    const addMembersModal = Modal.use();
    const userProfileModal = Modal.use();

    const confirmDeleteChat = Modal.useConfirm((value) => {
        if (value) {
            chatData?.is_group ? handleLeaveChat({ chatId }, { onSuccess: exitChat }) : handleDeleteChat({ chatId }, { onSuccess: exitChat });
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

    const exitChat = () => {
        modal.close();
        navigate(`/chats/${pathname.split('/')[2]}`);
    };

    const actions = (action: any) => {
        switch (action) {
            case 'audioCall':
                return notification.inDev();
            case 'videoCall':
                return notification.inDev();
            case 'leave':
                return confirmDeleteChat.open();
            case 'delete':
                return confirmDeleteChat.open();
            case 'add-members':
                addMembersModal.open();
        }
    };

    return (
        <>
            <UserProfileModal {...userProfileModal} />
            <AddMembersInChatModal {...addMembersModal} />
            <ChatAvatarsSwiper visible={visibleSwiper.value} chatId={chatId} onClose={() => visibleSwiper.set(false)} />
            <Modal.Confirm
                {...confirmDeleteChat}
                okText={chatData?.is_group ? 'Покинуть' : 'Удалить'}
                title={chatData?.is_group ? 'Покинуть чат' : 'Удалить чат'}
            />
            <Modal.Confirm {...confirmAddAvatar} okText="Установить" title="Установить аватар" />
            <ChatProfileModalView
                clickAvatar={() => visibleSwiper.set(true)}
                getScreenshot={getScreenshot}
                selectFile={selectFile}
                chat={chatProxy(chatData)}
                actions={actions}
                mediaTypes={mediaTypes}
                files={filesData}
                updateChatName={updateChatName}
                clickUser={userProfileModal.open}
            />
        </>
    );
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal {...modal}>
            <ChatProfileModal {...modal} />
        </Modal>
    );
}

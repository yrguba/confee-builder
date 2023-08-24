import React, { useState } from 'react';
import useFileUploader from 'react-use-file-uploader';

import { chatApi, chatProxy, ChatProfileModalView, chatTypes } from 'entities/chat';
import { messageTypes } from 'entities/message';
import { useRouter, useEasyState, UseFileUploaderTypes } from 'shared/hooks';
import { Modal, ModalTypes, Notification } from 'shared/ui';

function ChatProfileModal(modal: ModalTypes.UseReturnedType) {
    const { params, navigate } = useRouter();
    const chatId = Number(params.chat_id);

    const { data: chatData } = chatApi.handleGetChat({ chatId });
    const { mutate: handleDeleteChat } = chatApi.handleDeleteChat();
    const { mutate: handleAddAvatar } = chatApi.handleAddAvatar();
    const { mutate: handleUpdateChatName } = chatApi.handleUpdateChatName();

    const mediaTypes = useEasyState<messageTypes.MediaContentType | null>(!chatData?.is_group ? 'images' : null);

    const { data: filesData } = chatApi.handleGetChatFiles({ chatId, filesType: mediaTypes.value });

    const notification = Notification.use();

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
                            modal.close();
                            navigate('/chats');
                        },
                    }
                );
        }
    };

    return (
        <>
            <Modal.Confirm {...confirmAddAvatar} okText="Установить" title="Установить аватар" />
            <ChatProfileModalView
                getScreenshot={getScreenshot}
                selectFile={selectFile}
                chat={chatProxy(chatData)}
                actions={actions}
                mediaTypes={mediaTypes}
                files={filesData}
                updateChatName={updateChatName}
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

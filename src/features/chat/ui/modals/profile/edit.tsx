import React from 'react';
import useFileUploader from 'react-use-file-uploader';

import { chatApi, chatProxy, EditChatModalView } from 'entities/chat';
import { useEasyState, useRouter, useYup } from 'shared/hooks';
import { Input, Modal, ModalTypes } from 'shared/ui';

function EditChatModal(modal: ModalTypes.UseReturnedType) {
    const { params, navigate, pathname } = useRouter();

    const chatId = Number(params.chat_id);

    const visibleSwiper = useEasyState(false);

    const { data: chatData } = chatApi.handleGetChat({ chatId });
    const proxyChat = chatProxy(chatData?.data.data);

    const { mutate: handleAddAvatar } = chatApi.handleAddAvatar();
    const { mutate: handleUpdateChatName } = chatApi.handleUpdateChatName();
    const { mutate: handleUpdateChatDescription } = chatApi.handleUpdateChatDescription();

    const yup = useYup();

    const chatName = Input.use({
        yupSchema: yup.required('Введите имя контакта'),
        initialValue: proxyChat?.name || '',
    });

    const description = Input.use({
        initialValue: proxyChat?.description || '',
    });

    const { open: selectFile } = useFileUploader({
        accept: 'image',
        onAfterUploading: (data) => {
            confirmAddAvatar.open({ img: data.files[0].fileUrl, file: data.files[0].file });
        },
    });

    const getScreenshot = (preview: string, file: File) => handleAddAvatar({ chatId, img: file });

    const updateChatName = (name: string) =>
        handleUpdateChatName({ chatId, name, type: proxyChat?.is_personal ? 'personal' : 'company', companyId: params.company_id });

    const confirmAddAvatar = Modal.useConfirm<{ img: string; file: File }>((value, callbackData) => {
        value &&
            callbackData?.img &&
            handleAddAvatar({
                chatId,
                img: callbackData.file,
            });
    });

    const send = () => {
        if (!chatName.value) {
            return chatName.setError('Введите название');
        }
        updateChatName(chatName.value);
        handleUpdateChatDescription({ chatId, description: description.value });
    };

    return (
        <>
            <Modal.Confirm {...confirmAddAvatar} okText="Установить" title="Установить аватар" />
            <EditChatModalView
                clickAvatar={() => visibleSwiper.set(true)}
                chat={proxyChat}
                getScreenshot={getScreenshot}
                selectFile={selectFile}
                inputs={{
                    chatName,
                    description,
                }}
                send={send}
            />
        </>
    );
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal {...modal} centered={false}>
            <EditChatModal {...modal} />
        </Modal>
    );
}

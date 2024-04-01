import React, { useEffect, useState } from 'react';

import { appService, appStore, PhotoVideoSwiperView } from 'entities/app';

import { messageApi, messageStore } from '../../../../entities/message';
import { useFs, useRouter } from '../../../../shared/hooks';
import { Modal, ModalTypes } from '../../../../shared/ui';
import { ForwardMessagesModal } from '../../../message';

function PhotoVideoSwiper(modal: ModalTypes.UseReturnedType) {
    const { navigate, params } = useRouter();
    const fs = useFs();

    const dataInLs = localStorage.getItem('photoVideoSwiperData');

    const photoAndVideoFromSwiper = appStore.use.photoAndVideoFromSwiper();
    const forwardMessages = messageStore.use.forwardMessages();
    const openForwardMessageModal = messageStore.use.openForwardMessageModal();

    const { mutate: handleDeleteMessage } = messageApi.handleDeleteMessage();

    const confirmDeleteMessage = Modal.useConfirm((value) => {
        if (value && photoAndVideoFromSwiper.value.message?.chat_id) {
            handleDeleteMessage({
                chatId: photoAndVideoFromSwiper.value.message.chat_id,
                messageIds: [photoAndVideoFromSwiper.value.message.id],
                fromAll: true,
            });
        }
    });

    const downloads = (items: any) => {
        Promise.all(
            items.map(async (i: any) => {
                fs.downLoadAndSave({ baseDir: 'download', url: i.url, fileName: i.name, progressCallback: (percent) => '' });
            })
        );
    };

    const forward = () => {
        if (photoAndVideoFromSwiper.value?.message?.chat_id) {
            forwardMessages.set({
                fromChatName: 'fef',
                toChatId: photoAndVideoFromSwiper.value?.message.chat_id,
                messages: [photoAndVideoFromSwiper.value?.message],
                redirect: true,
            });
            openForwardMessageModal.set(true);
            photoAndVideoFromSwiper.clear();
        }
    };

    return (
        <>
            <Modal.Confirm {...confirmDeleteMessage} title="Удалить сообщение" closeText="Отмена" okText="Удалить" />
            <PhotoVideoSwiperView
                close={photoAndVideoFromSwiper.clear}
                forward={forward}
                data={photoAndVideoFromSwiper.value}
                downloads={downloads}
                deleteMessage={confirmDeleteMessage.open}
            />
            ;
        </>
    );
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal {...modal} full>
            <PhotoVideoSwiper {...modal} />
        </Modal>
    );
}

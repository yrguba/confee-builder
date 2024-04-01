import React, { useEffect, useState } from 'react';

import { appService, appStore, PhotoVideoSwiperView } from 'entities/app';
import usePhotoVideoSwiper from 'entities/app/lib/usePhotoVideoSwiper';

import { messageApi, messageStore } from '../../../entities/message';
import { useFs, useRouter } from '../../../shared/hooks';
import { Modal } from '../../../shared/ui';
import { ForwardMessagesModal } from '../../message';

function PhotoVideoSwiper() {
    const { navigate, params } = useRouter();
    const fs = useFs();

    const dataInLs = localStorage.getItem('photoVideoSwiperData');

    const swiper = usePhotoVideoSwiper();

    const photoAndVideoFromSwiper = appStore.use.photoAndVideoFromSwiper();
    const forwardMessages = messageStore.use.forwardMessages();
    const openForwardMessageModal = messageStore.use.openForwardMessageModal();

    const { mutate: handleDeleteMessage } = messageApi.handleDeleteMessage();

    const { socket } = usePhotoVideoSwiper({
        onClose: () => {
            photoAndVideoFromSwiper.clear();
        },
    });

    const confirmDeleteMessage = Modal.useConfirm((value) => {
        if (value && photoAndVideoFromSwiper.value.message?.chat_id) {
            handleDeleteMessage({
                chatId: photoAndVideoFromSwiper.value.message.chat_id,
                messageIds: [photoAndVideoFromSwiper.value.message.id],
                fromAll: true,
            });
            swiper.close();
        }
    });

    const downloads = (all: boolean, index: number | null) => {
        if (all) {
            Promise.all(
                photoAndVideoFromSwiper.value.items.map(async (i: any) => {
                    fs.downLoadAndSave({ baseDir: 'download', url: i.url, fileName: i.name, progressCallback: (percent) => '' });
                })
            );
        } else {
            const found = photoAndVideoFromSwiper.value.items.find((i: any, ind: number) => ind === index);
            found && fs.downLoadAndSave({ baseDir: 'download', url: found.url, fileName: found.name, progressCallback: (percent) => '' });
        }
    };

    const forward = () => {
        if (photoAndVideoFromSwiper.value?.message?.chat_id) {
            if (appService.tauriIsRunning) {
                socket.emit<any>('main', 'forwardMessage', photoAndVideoFromSwiper.value.message);
            } else {
                forwardMessages.set({
                    fromChatName: 'fef',
                    toChatId: photoAndVideoFromSwiper.value?.message.chat_id,
                    messages: [photoAndVideoFromSwiper.value?.message],
                    redirect: true,
                });
                openForwardMessageModal.set(true);
            }
        }
    };

    useEffect(() => {
        socket.listen<any>('main', 'photoVideoSwiperData', (data) => {
            photoAndVideoFromSwiper.set(data);
        });
    }, []);

    return (
        <>
            <Modal.Confirm {...confirmDeleteMessage} title="Удалить сообщение" closeText="Отмена" okText="Удалить" />
            <PhotoVideoSwiperView
                forward={forward}
                data={photoAndVideoFromSwiper.value}
                back={() => navigate(-1)}
                downloads={downloads}
                deleteMessage={confirmDeleteMessage.open}
            />
            ;
        </>
    );
}

export default PhotoVideoSwiper;

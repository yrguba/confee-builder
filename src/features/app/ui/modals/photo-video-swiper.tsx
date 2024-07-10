import React, { useEffect, useState } from 'react';

import { appService, appStore, PhotoVideoSwiperView } from 'entities/app';

import { messageStore } from '../../../../entities/message';
import { useFs, useRouter } from '../../../../shared/hooks';
import { Modal, ModalTypes } from '../../../../shared/ui';

function PhotoVideoSwiper(modal: ModalTypes.UseReturnedType) {
    const fs = useFs();

    const messagesForDelete = messageStore.use.messagesForDelete();
    const photoAndVideoFromSwiper = appStore.use.photoAndVideoFromSwiper();
    const forwardMessages = messageStore.use.forwardMessages();
    const openForwardMessageModal = messageStore.use.openForwardMessageModal();
    const filesToSend = messageStore.use.filesToSend();

    const downloads = (items: any) => {
        Promise.all(
            items.map(async (i: any) => {
                fs.downLoadAndSave({ baseDir: 'download', url: i.url, fileName: i.name, progressCallback: (percent) => '' });
            })
        );
    };

    const forward = (items: any) => {
        if (photoAndVideoFromSwiper.value?.message?.chat_id) {
            forwardMessages.set({
                fromChatName: 'fef',
                toChatId: photoAndVideoFromSwiper.value?.message.chat_id,
                messages: [photoAndVideoFromSwiper.value?.message],
                redirect: true,
                filesIds: items.length ? items.map((i: any) => i.id) : [],
            });
            openForwardMessageModal.set(true);
            photoAndVideoFromSwiper.clear();
        }
    };

    const deleteMessage = () => {
        if (photoAndVideoFromSwiper?.value?.message) {
            messagesForDelete.set([photoAndVideoFromSwiper.value.message]);
        }
    };

    const deleteImage = (id: string | number) => {
        filesToSend.deleteById({ type: 'image', id });
        const arr = photoAndVideoFromSwiper.value.items.filter((i) => i.id !== id);
        photoAndVideoFromSwiper.set({ ...photoAndVideoFromSwiper.value, items: arr });
        !arr.length && photoAndVideoFromSwiper.clear();
    };

    const replaceImage = (id: number | string, file: File, url: string) => {
        photoAndVideoFromSwiper.set({
            ...photoAndVideoFromSwiper.value,
            items: photoAndVideoFromSwiper.value.items.map((i) => {
                if (i.id === id) return { ...i, url };
                return i;
            }),
        });
        filesToSend.replaceById({ type: 'image', id, file, url });
    };

    return (
        <>
            <PhotoVideoSwiperView
                close={photoAndVideoFromSwiper.clear}
                forward={forward}
                data={photoAndVideoFromSwiper.value}
                downloads={downloads}
                deleteMessage={deleteMessage}
                deleteImage={deleteImage}
                replaceImage={replaceImage}
            />
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

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
    const chatId = Number(params.chat_id);
    const dataInLs = localStorage.getItem('photoVideoSwiperData');

    const swiper = usePhotoVideoSwiper();

    const photoAndVideoFromSwiper = appStore.use.photoAndVideoFromSwiper();
    const forwardMessages = messageStore.use.forwardMessages();
    const openForwardMessageModal = messageStore.use.openForwardMessageModal();

    const [data, setData] = useState(dataInLs ? JSON.parse(dataInLs) : null);

    const currentData = data || photoAndVideoFromSwiper.value;

    const { mutate: handleDeleteMessage } = messageApi.handleDeleteMessage();

    const { socket } = usePhotoVideoSwiper({
        onClose: () => {
            setData(null);
            localStorage.removeItem('photoVideoSwiperData');
        },
    });

    const confirmDeleteMessage = Modal.useConfirm((value) => {
        if (value && data.message) {
            handleDeleteMessage({ chatId, messageIds: [data.message.id], fromAll: true });
            // swiper.close();
        }
    });

    const downloads = (all: boolean, index: number | null) => {
        if (all) {
            Promise.all(
                currentData.items.map(async (i: any) => {
                    fs.downLoadAndSave({ baseDir: 'download', url: i.url, fileName: i.name, progressCallback: (percent) => '' });
                })
            );
        } else {
            const found = currentData.items.find((i: any, ind: number) => ind === index);
            found && fs.downLoadAndSave({ baseDir: 'download', url: found.url, fileName: found.name, progressCallback: (percent) => '' });
        }
    };

    const forward = () => {
        if (appService.tauriIsRunning) {
            socket.emit<any>('main', 'forwardMessage', data.message);
        } else {
            forwardMessages.set({ fromChatName: 'fef', toChatId: currentData?.message.chat_id, messages: [currentData?.message], redirect: true });
            openForwardMessageModal.set(true);
        }
    };

    useEffect(() => {
        socket.listen<any>('main', 'photoVideoSwiperData', (data) => {
            setData(data);
            localStorage.setItem('photoVideoSwiperData', JSON.stringify(data));
        });
    }, []);

    return (
        <>
            <Modal.Confirm {...confirmDeleteMessage} title="Удалить сообщение" closeText="Отмена" okText="Удалить" />
            <PhotoVideoSwiperView
                forward={forward}
                data={currentData}
                back={() => navigate(-1)}
                downloads={downloads}
                deleteMessage={confirmDeleteMessage.open}
            />
            ;
        </>
    );
}

export default PhotoVideoSwiper;

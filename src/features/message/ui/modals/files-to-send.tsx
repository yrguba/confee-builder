import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDebounce } from 'react-use';

import { FilesToSendModalView, messageApi, messageStore, messageTypes } from 'entities/message';
import { UseFileUploaderTypes, useFileUploader, useArray, useEasyState } from 'shared/hooks';
import { getRandomInt } from 'shared/lib';
import { Modal, ModalTypes, CardTypes } from 'shared/ui';

import { debounce } from '../../../../shared/lib';

type Props = {
    modal: ModalTypes.UseReturnedType;
    onClose: () => void;
};

const debounceUpload = debounce((cb) => cb(), 100);

function FilesToSendModal(props: Props) {
    const { modal, onClose } = props;
    const params = useParams();
    const chatId = Number(params.chat_id);

    const isLoading = useEasyState(false);

    const filesToSend = messageStore.use.filesToSend();

    const { mutate: handleSendFileMessage, error: sendingError } = messageApi.handleSendFileMessage();

    const close = () => {
        modal.close();
        onClose();
    };

    const sendFiles = async () => {
        isLoading.set(true);
        const send = async (arr: any[], type: messageTypes.MediaContentType) => {
            const formData = new FormData();

            await Promise.all(
                arr.map(async (i) => {
                    formData.append(`files[${type}][]`, i.file);
                })
            );
            return new Promise((resolve, reject) => {
                handleSendFileMessage(
                    {
                        chatId,
                        files: formData,
                        filesForMock: arr.map((i) => ({ id: getRandomInt(100), url: i.fileUrl, name: i.name })),
                        filesType: type,
                    },
                    {
                        onSuccess: (data) => {
                            resolve(null);
                        },
                    }
                );
            });
        };

        if (filesToSend.value.image.length) {
            await send(filesToSend.value.image, 'images');
        }
        if (filesToSend.value.audio.length) {
            await send(filesToSend.value.audio, 'audios');
        }
        if (filesToSend.value.video.length) {
            await send(filesToSend.value.video, 'videos');
        }
        if (filesToSend.value.document.length) {
            await send(filesToSend.value.document, 'documents');
        }
        close();
        isLoading.set(false);
    };

    const { open: openFilesDownloader, dropContainerRef } = useFileUploader({
        accept: 'all',
        multiple: true,
        maxImgWidthOrHeight: 1800,
        onAfterUploading: (data) => {
            debounceUpload(() => {
                if (data.sortByAccept) {
                    isLoading.set(true);
                    Object.entries(data.sortByAccept).forEach(([key, value]) => {
                        if (value.length) {
                            filesToSend.add({ type: key as any, files: value });
                        }
                    });
                    isLoading.set(false);
                }
            });
        },
    });

    return (
        <div ref={dropContainerRef}>
            <FilesToSendModalView
                sendingError={!!sendingError}
                sendFiles={sendFiles}
                close={close}
                addFiles={openFilesDownloader}
                files={filesToSend}
                loading={isLoading.value}
            />
        </div>
    );
}

export default function (props: Props) {
    return (
        <Modal {...props.modal}>
            <FilesToSendModal {...props} />
        </Modal>
    );
}

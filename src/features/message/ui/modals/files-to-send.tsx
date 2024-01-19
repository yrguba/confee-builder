import React from 'react';
import { useParams } from 'react-router';

import { FilesToSendModalView, messageApi, messageTypes } from 'entities/message';
import { UseFileUploaderTypes, useFileUploader, useArray, useEasyState } from 'shared/hooks';
import { getRandomInt, compressImage } from 'shared/lib';
import { Modal, ModalTypes, CardTypes } from 'shared/ui';

type Props = {
    modal: ModalTypes.UseReturnedType;
    files: UseFileUploaderTypes.Types.SortByAcceptType;
    onClose: () => void;
};

function FilesToSendModal(props: Props) {
    const { modal, files, onClose } = props;
    const params = useParams();
    const chatId = Number(params.chat_id);

    const isLoading = useEasyState(false);

    const { mutate: handleSendFileMessage, error: sendingError } = messageApi.handleSendFileMessage();

    const images = useArray<UseFileUploaderTypes.Types.ImageFile>({ initialArr: files.image });
    const audios = useArray<UseFileUploaderTypes.Types.AudioFile>({ initialArr: files.audio });
    const videos = useArray<UseFileUploaderTypes.Types.VideoFile>({ initialArr: files.video });
    const documents = useArray<UseFileUploaderTypes.Types.DocumentFile>({ initialArr: files.document });

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
                    if (type === 'images') {
                        const compressed = await compressImage(i.file, i?.name, 50);
                        formData.append(`files[${type}][]`, compressed);
                    } else {
                        formData.append(`files[${type}][]`, i.file);
                    }
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
        if (images.array.length) {
            await send(images.array, 'images');
        }
        if (audios.array.length) {
            await send(audios.array, 'audios');
        }
        if (videos.array.length) {
            await send(videos.array, 'videos');
        }
        if (documents.array.length) {
            await send(documents.array, 'documents');
        }
        close();
        isLoading.set(false);
    };

    const { open: openFilesDownloader } = useFileUploader({
        accept: 'all',
        multiple: true,
        onAfterUploading: (data) => {
            if (data.sortByAccept) {
                isLoading.set(true);
                Object.entries(data.sortByAccept).forEach(([key, value]) => {
                    switch (key) {
                        case 'image':
                            return images.concat(value);
                        case 'audio':
                            return audios.concat(value as any);
                        case 'video':
                            return videos.concat(value as any);
                        case 'document':
                            return documents.concat(value);
                    }
                });
                isLoading.set(false);
            }
        },
    });

    return (
        <FilesToSendModalView
            sendingError={!!sendingError}
            sendFiles={sendFiles}
            close={close}
            addFiles={openFilesDownloader}
            images={images}
            audios={audios}
            videos={videos}
            documents={documents}
            loading={isLoading.value}
        />
    );
}

export default function (props: Props) {
    return (
        <Modal {...props.modal}>
            <FilesToSendModal {...props} />
        </Modal>
    );
}

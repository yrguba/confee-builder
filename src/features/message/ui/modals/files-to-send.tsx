import React from 'react';

import { chatApi, CreateChatModalView } from 'entities/chat';
import { FilesToSendModalView } from 'entities/message';
import { viewerApi, contactProxy } from 'entities/viewer';
import { useArray, useEasyState, useRouter, UseFileUploaderTypes, useFileUploader } from 'shared/hooks';
import { generateItems } from 'shared/lib';
import { Modal, Notification, ModalTypes, CardTypes } from 'shared/ui';

import { createMemo } from '../../../../shared/hooks';
import UseArray from '../../../../shared/hooks/useArray';

type Props = {
    modal: ModalTypes.UseReturnedType;
    files: UseFileUploaderTypes.Types.SortBuAcceptType;
};

function FilesToSendModal(props: Props) {
    const { modal, files } = props;

    const images = UseArray<UseFileUploaderTypes.Types.ImageFile>({ initialArr: files.image });
    const audios = UseArray<UseFileUploaderTypes.Types.AudioFile>({ initialArr: files.audio });
    const videos = UseArray<UseFileUploaderTypes.Types.VideoFile>({ initialArr: files.video });
    const documents = UseArray<UseFileUploaderTypes.Types.DocumentFile>({ initialArr: files.document });

    // handleSendFileMessage({
    //     chatId,
    //     files: formData,
    //     params: { reply_to_message_id: replyMessage.value?.id },
    //     replyMessage: replyMessage.value,
    //     filesForMock: value.map((i) => ({ id: getRandomInt(100), link: i.fileUrl, name: i.name })),
    //     filesType: `${key}s` as MessageType,
    // });
    const { open: openFilesDownloader, sortByAccept } = useFileUploader({
        accept: 'all',
        multiple: true,
        onAfterUploading: (data) => {
            if (data.sortByAccept) {
                Object.entries(data.sortByAccept).forEach(([key, value]) => {
                    switch (key) {
                        case 'image':
                            return images.concat(value);
                        case 'audios':
                            return audios.concat(value as any);
                        case 'videos':
                            return videos.concat(value as any);
                        case 'documents':
                            return documents.concat(value);
                        // const formData = new FormData();
                        // value.forEach((i) => {
                        //     formData.append(`files[${key}s][]`, i.file);
                        // });
                    }
                });
            }
        },
    });

    return <FilesToSendModalView addFiles={openFilesDownloader} images={images} audios={audios} videos={videos} documents={documents} />;
}

export default function (props: Props) {
    return (
        <Modal {...props.modal}>
            <FilesToSendModal {...props} />
        </Modal>
    );
}

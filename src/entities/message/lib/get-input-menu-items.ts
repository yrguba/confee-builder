import { useEffect } from 'react';

import { useFileUploader } from 'shared/hooks';

import { useAppStore } from '../../app';
import useMessageStore from '../model/store';
import { InputMenuItem } from '../model/types';

function getInputMenuItems(): InputMenuItem[] {
    const setMediaContentToSend = useMessageStore.use.setMediaContentToSend();

    const image = useFileUploader({
        accept: 'image',
        multiple: true,
        formDataName: 'images',
    });

    const audio = useFileUploader({
        accept: 'audio',
        multiple: true,
        formDataName: 'audios',
    });

    const video = useFileUploader({
        accept: 'video',
        multiple: true,
        formDataName: 'videos',
    });

    const document = useFileUploader({
        accept: 'document',
        // @ts-ignore
        extension: ['.pdf', '.XLSX', '.txt', '.doc', '.docx'],
        multiple: true,
        formDataName: 'documents',
    });

    const dto = (e: any) => ({
        url: e.fileUrl,
        name: e.name,
    });

    useEffect(() => {
        image.files.length && setMediaContentToSend({ type: 'image', list: image.files.map((i) => dto(i)), formData: image.formData });
        audio.files.length && setMediaContentToSend({ type: 'audio', list: audio.files.map((i) => dto(i)), formData: audio.formData });
        video.files.length && setMediaContentToSend({ type: 'video', list: video.files.map((i) => dto(i)), formData: video.formData });
        document.files.length && setMediaContentToSend({ type: 'document', list: document.files.map((i) => dto(i)), formData: document.formData });
    }, [image.files.length, audio.files.length, video.files.length, document.files.length, image.formData, audio.formData, video.formData, document.formData]);

    return [
        { id: 0, title: 'Загрузить фото', icon: 'image', onClick: image.open },
        {
            id: 1,
            title: 'Загрузить аудио',
            icon: 'audio',
            onClick: () => '',
        },
        {
            id: 2,
            title: 'Загрузить видео',
            icon: 'video',
            onClick: () => '',
        },
        { id: 3, title: 'Загрузить документы', icon: 'document', onClick: document.open },
    ];
}

export default getInputMenuItems;

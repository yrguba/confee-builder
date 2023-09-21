import { useEffect, useState } from 'react';

import { appApi } from 'entities/app';

import useEasyState from './useEasyState';
import useFS from './useFS';
import { fileConverter, getVideoCover } from '../lib';

function useFetchMediaContent(url = '', saveInCache = false, type?: 'video') {
    const [src, setSrc] = useState<any>('');
    const videoPreview = useEasyState<string>('');
    const [fileBlob, setFileBlob] = useState<Blob | null>(null);

    const { saveFile, getFile } = useFS();

    const checkFetch = () => {
        if (!url || typeof url !== 'string') return false;
        if (url?.split('/')?.length > 2) {
            return url?.split('/')[1] === 'api';
        }
    };

    const isFetch = !!checkFetch();

    const { data: fileData, isLoading, error } = appApi.handleGetFile(url, isFetch);
    useEffect(() => {
        const fn = async () => {
            if (isFetch && fileData) {
                const filePath = fileConverter.blobLocalPath(fileData);
                if (type === 'video') {
                    const preview = await getVideoCover(filePath, 0.5);
                    videoPreview.set(preview);
                }
                setSrc(filePath);
            } else {
                setSrc(url);
            }
        };
        fn().then();
    }, [url, fileData]);

    return {
        videoPreview: videoPreview.value,
        src,
        fileBlob,

        error,
        isLoading: !url || !isFetch ? false : isLoading,
    };
}

export default useFetchMediaContent;

import { useEffect, useState } from 'react';

import { appApi } from 'entities/app';

import useEasyState from './useEasyState';
import useFS from './useFS';
import { fileConverter, getVideoCover } from '../lib';

function useFetchMediaContent(url = '', saveInCache = false, type?: 'video') {
    const [src, setSrc] = useState<any>('');
    const videoPreview = useEasyState<string>('');
    const [fileBlob, setFileBlob] = useState<Blob | null>(null);
    const [orientation, setOrientation] = useState<'vertical' | 'horizontal'>('vertical');

    const { saveFile, getFile } = useFS();

    const checkFetch = () => {
        if (!url || typeof url !== 'string') return false;
        if (url?.split('/')?.length > 2) {
            return url?.split('/')[1] === 'api';
        }
    };

    const isFetch = !!checkFetch();

    const { data: imgData, isLoading, error } = appApi.handleGetFile(url, isFetch);

    useEffect(() => {
        const fn = async () => {
            let fileInCache = await getFile({ baseDir: 'Document', folderDir: 'cache', fileName: url?.split('/')?.pop() });
            if (fileInCache && typeof fileInCache === 'string' && !!window.__TAURI__) {
                const img = new Image();
                img.onload = function () {
                    setOrientation(img.width > img.height ? 'horizontal' : 'vertical');
                };
                if (type === 'video') {
                    fileInCache = fileInCache.replace('application/octet-stream', 'video/mp4');
                    const preview = await getVideoCover(fileInCache, 0.5);
                    typeof preview === 'string' && videoPreview.set(preview);
                }
                if (typeof fileInCache === 'string') img.src = fileInCache;
                setSrc(fileInCache);
                setFileBlob(fileConverter.base64ToBlob(fileInCache));
            } else if (imgData) {
                setFileBlob(imgData);
                saveInCache && (await saveFile({ baseDir: 'Document', folderDir: 'cache', fileName: url?.split('/')?.pop(), fileBlob: imgData }));
                const base64 = await fileConverter.blobToBase64(imgData);
                const img = new Image();
                img.onload = function () {
                    setOrientation(img.width > img.height ? 'horizontal' : 'vertical');
                };
                if (typeof base64 === 'string') img.src = base64;
                setSrc(base64);
            } else {
                setSrc(url);
            }
        };
        fn().then();
    }, [url, imgData]);

    return {
        videoPreview: videoPreview.value,
        src,
        fileBlob,
        orientation,
        error,
        isLoading: !url || !isFetch ? false : isLoading,
    };
}

export default useFetchMediaContent;

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import useFS from './useFS';
import { axiosClient } from '../configs';
import { fileConverter } from '../lib';

function handleGetFile(url: string, isFetch: boolean) {
    return useQuery(['get-chat', url], () => axiosClient.get(url, { responseType: 'blob' }), {
        staleTime: Infinity,
        enabled: isFetch,
        select: (data) => {
            return data.data;
        },
    });
}

function useFetchMediaContent(url = '', saveInCache = false) {
    const [src, setSrc] = useState<any>('');
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

    const { data: imgData, isLoading, error } = handleGetFile(url, isFetch);

    useEffect(() => {
        const fn = async () => {
            const fileInCache = await getFile({ baseDir: 'Document', folderDir: 'cache', fileName: url?.split('/')?.pop() });
            if (fileInCache && typeof fileInCache === 'string' && !!window.__TAURI__) {
                setSrc(fileInCache);
                const img = new Image();
                img.onload = function () {
                    setOrientation(img.width > img.height ? 'horizontal' : 'vertical');
                };
                if (typeof fileInCache === 'string') img.src = fileInCache;
                setFileBlob(fileConverter.fromBase64ToBlob(fileInCache));
            } else if (imgData) {
                setFileBlob(imgData);
                saveInCache && (await saveFile({ baseDir: 'Document', folderDir: 'cache', fileName: url?.split('/')?.pop(), fileBlob: imgData }));
                const base64 = await fileConverter.fromBlobToBase64(imgData);
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
        src,
        fileBlob,
        orientation,
        error,
        isLoading: !url || !isFetch ? false : isLoading,
    };
}

export default useFetchMediaContent;

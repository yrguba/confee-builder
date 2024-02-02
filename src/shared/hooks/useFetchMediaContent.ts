import { useEffect, useState } from 'react';
import { useUpdateEffect } from 'react-use';

import { appApi, appService } from 'entities/app';

import useEasyState from './useEasyState';
import useFS, { FileTypes } from './useFS';
import { fileConverter, getVideoCover } from '../lib';

type Props = {
    url: string;
    name?: string;
    returnedVideoCover?: boolean;
    fileType: FileTypes;
};

function useFetchMediaContent(props: Props) {
    const { url, returnedVideoCover, name, fileType } = props;

    const src = useEasyState<any>('');
    const videoCover = useEasyState<string | null>(null);
    const { save, getFileUrl } = useFS();

    const { online } = appService.getNetworkState();

    const [enable, { data: fileData, isFetching, isLoading, error }] = appApi.handleLazyGetFile(url, 'arraybuffer');

    const fileName = `${url}${name}`;

    useEffect(() => {
        if (fileData) {
            const filePath = fileConverter.arrayBufferToBlobLocalPath(fileData as ArrayBuffer);
            src.set(filePath);
            if (name) {
                save({
                    url,
                    fileName,
                    baseDir: 'document',
                    folderDir: 'cache',
                    fileType,
                });
            }
        }
    }, [fileData]);

    useEffect(() => {
        const fn = async () => {
            if (url) {
                if (url.includes('base64') || url.includes('blob')) {
                    return src.set(url);
                }
                const fileInCache = await getFileUrl({ fileName, baseDir: 'Document', folderDir: 'cache', fileType });
                if (fileInCache) {
                    return src.set(fileInCache);
                }
                if (!online) {
                    return src.set('');
                }
                enable();
            }
        };
        fn().then((res) => {});
    }, [url, online]);

    const getFileBlob = async () => {
        const res = await fetch(src.value);
        return res.blob();
    };
    return {
        src: src.value,
        getFileBlob,
        videoCover: videoCover.value,
        error,
        isLoading: isFetching,
    };
}

export default useFetchMediaContent;

import { useQuery } from '@tanstack/react-query';
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

    const fileName = `${url}${name}`;

    const [enable, { data: fileData, isFetching, isLoading, error }] = appApi.handleLazyGetFile(url, 'arraybuffer');

    useEffect(() => {
        if (url) {
            if (url.includes('base64') || url.includes('blob')) {
                return src.set(url);
            }
            getFileUrl({ fileName, baseDir: 'Document', folderDir: 'cache', fileType }).then((res) => {
                if (res) {
                    return src.set(res);
                }
                enable();
            });
        }
    }, [url]);

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

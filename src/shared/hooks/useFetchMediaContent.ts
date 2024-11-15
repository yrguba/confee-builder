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
    fileType: FileTypes;
};

function useFetchMediaContent(props: Props) {
    const { url, name, fileType } = props;

    const src = useEasyState('');

    const { downLoadAndSave, getFileUrl } = useFS();

    const fileName = `${url}${name}`;

    const [enable, { data: fileData, isFetching, isLoading, error }] = appApi.handleLazyGetFile(url, 'arraybuffer');

    useEffect(() => {
        if (url) {
            if (url.includes('base64') || url.includes('blob') || url.includes('localhost')) {
                return src.set(url);
            }
            getFileUrl({ fileName, baseDir: 'document', folder: 'cache', fileType }).then((res) => {
                if (res) {
                    return src.set(res);
                }
                enable();
            });
        }
    }, [url]);

    useEffect(() => {
        if (fileData) {
            const filePath = fileConverter.arrayBufferToBlobLocalPath(fileData as ArrayBuffer, fileType);
            src.set(filePath);
            // @ts-ignore
            if (fileType === 'img' && fileData.byteLength < 6291456) return;
            if (name) {
                downLoadAndSave({
                    url,
                    fileName,
                    baseDir: 'document',
                    folder: 'cache',
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
        error,
        isLoading: isFetching,
    };
}

export default useFetchMediaContent;

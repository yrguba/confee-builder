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
    const { save, saveFile, getFileUrl } = useFS();

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
                    arrayBuffer: fileData as ArrayBuffer,
                    progressCallback: (p) => console.log(p),
                }).then();
            }
        }
    }, [fileData]);

    useEffect(() => {
        const fn = async () => {
            if (url) {
                // loading.set(true);
                if (url.includes('base64') || url.includes('blob')) {
                    const updUrl = url.replace('x-matroska', 'mp4');
                    return src.set(updUrl);
                }
                // const fileInCache = await getFileUrl({ fileName, baseDir: 'Document', folderDir: 'cache', fileType });
                // if (fileInCache) {
                //     return src.set(fileInCache);
                // }
                enable();
            }
        };
        fn().then((res) => {});
    }, [url]);

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

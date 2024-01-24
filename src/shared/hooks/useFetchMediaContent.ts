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
    const fileBlob = useEasyState<Blob | null>(null);
    const videoCover = useEasyState<string | null>(null);
    const loading = useEasyState(false);
    const { saveFile, getFileUrl } = useFS();

    const [enable, { data: fileData, isFetching, isLoading, error }] = appApi.handleLazyGetFile(url);

    const fileName = `${url}${name}`.split('/').join('');

    useEffect(() => {
        if (fileData) {
            const filePath = fileConverter.blobLocalPath(fileData as Blob);
            src.set(filePath);
            loading.set(false);
            saveFile({ fileName, baseDir: 'Document', folderDir: 'cache', fileBlob: fileData as Blob, fileType });
        }
    }, [fileData]);

    useEffect(() => {
        const fn = async () => {
            if (url) {
                loading.set(true);
                if (url.includes('base64') || url.includes('blob')) {
                    const updUrl = url.replace('x-matroska', 'mp4');
                    src.set(updUrl);
                    return loading.set(false);
                }
                const fileInCache = await getFileUrl({ fileName, baseDir: 'Document', folderDir: 'cache', fileType });
                if (fileInCache) {
                    src.set(fileInCache);
                    return loading.set(false);
                }
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
        isLoading: loading.value,
    };
}

export default useFetchMediaContent;

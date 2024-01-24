import { useEffect, useState } from 'react';
import { useUpdateEffect } from 'react-use';

import { appApi, appService } from 'entities/app';

import useEasyState from './useEasyState';
import useFS from './useFS';
import { fileConverter, getVideoCover } from '../lib';

type Props = {
    url: string;
    name?: string;
    returnedVideoCover?: boolean;
};

function useFetchMediaContent(props: Props) {
    const { url, returnedVideoCover, name } = props;

    const src = useEasyState<any>('');
    const fileBlob = useEasyState<Blob | null>(null);
    const videoCover = useEasyState<string | null>(null);
    const loading = useEasyState(false);
    const { saveFile, getFileUrl } = useFS();

    const [enable, { data: fileData, isFetching, isLoading, error }] = appApi.handleLazyGetFile(url);

    const fileName = `${url?.split('/').join('')}${name?.split('/')?.join('')}`;

    useEffect(() => {
        if (fileData) {
            const filePath = fileConverter.blobLocalPath(fileData as Blob);
            src.set(filePath);
            fileBlob.set(fileData as Blob);
            loading.set(false);
            saveFile({ fileName, baseDir: 'Document', folderDir: 'cache', fileBlob: fileData as Blob }).then();
        }
    }, [fileData]);

    useEffect(() => {
        const fn = async () => {
            if (url) {
                loading.set(true);
                if (url.includes('base64') || url.includes('blob')) {
                    const updUrl = url.replace('x-matroska', 'mp4');
                    const res = await fetch(updUrl);
                    const blob = await res.blob();
                    return { url, blob };
                }
                const fileInCache = await getFileUrl({ fileName, baseDir: 'Document', folderDir: 'cache' });
                if (fileInCache) {
                    const res = await fetch(fileInCache);
                    const blob = await res.blob();
                    return { url: fileInCache, blob };
                }
                throw error;
            }
        };
        fn()
            .then((res) => {
                res?.url && src.set(res.url);
                res?.blob && fileBlob.set(res.blob);
                loading.set(false);
            })
            .catch(() => {
                enable();
                if (!appService.tauriIsRunning && fileData) {
                    loading.set(false);
                }
            });
    }, [url]);
    console.log(loading.value);
    return {
        src: src.value,
        fileBlob: fileBlob.value,
        videoCover: videoCover.value,
        error,
        isLoading: loading.value,
    };
}

export default useFetchMediaContent;

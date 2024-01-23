import { useEffect, useState } from 'react';
import { useUpdateEffect } from 'react-use';

import { appApi } from 'entities/app';

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

    useUpdateEffect(() => {
        if (fileData) {
            loading.set(true);
            const filePath = fileConverter.blobLocalPath(fileData as Blob);
            src.set(filePath);
            fileBlob.set(fileData as Blob);
            saveFile({ fileName: name, baseDir: 'Document', folderDir: 'cache', fileBlob: fileData as Blob }).then();
            loading.set(false);
        }
    }, [fileData]);

    useEffect(() => {
        const fn = async () => {
            loading.set(true);
            if (url) {
                if (url.includes('base64') || url.includes('blob')) {
                    const updUrl = url.replace('x-matroska', 'mp4');
                    const res = await fetch(updUrl);
                    const blob = await res.blob();
                    return { url, blob };
                }
                const fileInCache = await getFileUrl({ fileName: name, baseDir: 'Document', folderDir: 'cache' });
                if (fileInCache) {
                    const res = await fetch(fileInCache);
                    const blob = await res.blob();
                    return { url: fileInCache, blob };
                }
                return enable();
            }
        };

        fn()
            .then((res) => {
                res?.url && src.set(res.url);
                res?.blob && fileBlob.set(res.blob);
            })
            .finally(() => {
                loading.set(false);
            });
    }, [url]);

    return {
        src: src.value,
        fileBlob: fileBlob.value,
        videoCover: videoCover.value,
        error,
        isLoading: loading.value,
    };
}

export default useFetchMediaContent;

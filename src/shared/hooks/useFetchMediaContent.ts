import { useEffect, useState } from 'react';
import { useUpdateEffect } from 'react-use';

import { appApi } from 'entities/app';

import useEasyState from './useEasyState';
import useFS from './useFS';
import { fileConverter, getVideoCover } from '../lib';

function useFetchMediaContent(url = '', saveInCache = false, returnVideoCover = false) {
    const [src, setSrc] = useState<any>('');
    const [fileBlob, setFileBlob] = useState<Blob | null>(null);
    const videoCover = useEasyState<string | null>(null);
    const loading = useEasyState(false);
    const { saveFile, getFile } = useFS();

    const checkFetch = () => {
        if (!url || typeof url !== 'string') return false;
        if (url?.split('/')?.length > 2) {
            return url?.split('/')[1] === 'api';
        }
    };

    const isFetch = !!checkFetch();

    const { data: fileData, isLoading, error, isFetching } = appApi.handleGetFile(url, isFetch);

    useEffect(() => {
        const fn = async () => {
            loading.set(true);
            if (isFetch && fileData) {
                const filePath = fileConverter.blobLocalPath(fileData);
                setSrc(filePath);
                setFileBlob(fileData);
                if (returnVideoCover) {
                    const cover = await getVideoCover(filePath, 0.1);
                    videoCover.set(cover);
                }
            } else {
                fetch(url)
                    .then((res) => res.blob())
                    .then((res) => setFileBlob(res));
                setSrc(url);
            }
        };
        fn()
            .then()
            .finally(() => loading.set(false));
    }, [url, fileData]);

    return {
        src,
        fileBlob,
        videoCover: videoCover.value,
        error,
        isLoading: !url || !isFetch ? false : loading.value || isLoading,
    };
}

export default useFetchMediaContent;

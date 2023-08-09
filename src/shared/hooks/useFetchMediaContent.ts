import { useEffect, useState } from 'react';

import useFS from './useFS';
import { axiosClient } from '../configs';
import { fileConverter } from '../lib';

function useFetchMediaContent(url = '') {
    const [src, setSrc] = useState<any>('');
    const [orientation, setOrientation] = useState<'vertical' | 'horizontal'>('vertical');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const { saveFile, getFile } = useFS();

    const checkFetch = () => {
        if (!url || typeof url !== 'string') return false;
        if (url?.split('/').length > 2) {
            return url?.split('/')[1] === 'api';
        }
    };

    useEffect(() => {
        const fn = async () => {
            const fileInCache = await getFile({ baseDir: 'Document', folderDir: 'cache', fileName: url?.split('/').pop() });
            if (fileInCache && typeof fileInCache === 'string') {
                const file = document.createElement('img');
                file.src = fileInCache;
                setOrientation(file.width > file.height ? 'horizontal' : 'vertical');
                setSrc(fileInCache);
                error && setError(false);
            } else if (checkFetch()) {
                setIsLoading(true);
                axiosClient
                    .get(url, { responseType: 'blob' })
                    // .then(getBase64)
                    .then(async (res: any) => {
                        await saveFile({ baseDir: 'Document', folderDir: 'cache', fileName: url?.split('/').pop(), fileBlob: res.data });
                        const file = document.createElement('img');
                        file.src = res.data;
                        setOrientation(file.width > file.height ? 'horizontal' : 'vertical');
                        const base64 = await fileConverter.fromBlobToBase64(res.data);
                        setSrc(base64);
                        error && setError(false);
                    })
                    .catch(() => setError(true))
                    .finally(() => setIsLoading(false));
            } else {
                setSrc(url);
            }
        };
        fn().then();
    }, [url]);

    return {
        src,
        orientation,
        error,
        isLoading,
    };
}

export default useFetchMediaContent;

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
            setIsLoading(true);
            const fileInCache = await getFile({ baseDir: 'Document', folderDir: 'cache', fileName: url?.split('/').pop() });
            if (fileInCache && typeof fileInCache === 'string') {
                setSrc(fileInCache);
                const img = new Image();
                img.onload = function () {
                    setOrientation(img.width > img.height ? 'horizontal' : 'vertical');
                };
                if (typeof fileInCache === 'string') img.src = fileInCache;
                error && setError(false);
            } else if (checkFetch()) {
                axiosClient
                    .get(url, { responseType: 'blob' })
                    // .then(getBase64)
                    .then(async (res: any) => {
                        setIsLoading(true);
                        await saveFile({ baseDir: 'Document', folderDir: 'cache', fileName: url?.split('/').pop(), fileBlob: res.data });
                        const base64 = await fileConverter.fromBlobToBase64(res.data);
                        const img = new Image();
                        img.onload = function () {
                            setOrientation(img.width > img.height ? 'horizontal' : 'vertical');
                        };
                        if (typeof base64 === 'string') img.src = base64;
                        setSrc(base64);
                        error && setError(false);
                    })
                    .catch(() => setError(true))
                    .finally(() => setIsLoading(false));
            } else {
                setSrc(url);
            }
        };
        fn()
            .then()
            .finally(() => setIsLoading(false));
    }, [url]);

    return {
        src,
        orientation,
        error,
        isLoading,
    };
}

export default useFetchMediaContent;

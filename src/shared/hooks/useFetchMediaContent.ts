import { useEffect, useState } from 'react';

import useFileDownloads from './useFileDownloads';
import { axiosClient } from '../configs';

function useFetchMediaContent(url = '') {
    const [src, setSrc] = useState<any>('');
    const [orientation, setOrientation] = useState<'vertical' | 'horizontal'>('vertical');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const { save: saveFile } = useFileDownloads();

    const checkFetch = () => {
        if (!url || typeof url !== 'string') return false;
        if (url?.split('/').length > 2) {
            return url?.split('/')[1] === 'api';
        }
    };

    useEffect(() => {
        if (checkFetch()) {
            setIsLoading(true);
            axiosClient
                .get(url, { responseType: 'blob' })
                // .then(getBase64)
                .then(async (res: any) => {
                    await saveFile({ baseDir: 'Document', folderDir: 'cache', fileName: url?.split('/').pop(), fileBlob: res.data });
                    const file = document.createElement('img');
                    file.src = res;
                    setOrientation(file.width > file.height ? 'horizontal' : 'vertical');
                    const base64 = await getBase64(res);
                    setSrc(base64);
                    error && setError(false);
                })
                .catch(() => setError(true))
                .finally(() => setIsLoading(false));
        } else {
            setSrc(url);
        }
    }, [url]);

    return {
        src,
        orientation,
        error,
        isLoading,
    };
}

export default useFetchMediaContent;

async function getBase64(blob: any) {
    const reader = new FileReader();
    await new Promise((resolve, reject) => {
        reader.onload = resolve;
        reader.onerror = reject;
        reader.readAsDataURL(blob.data);
    });
    return reader.result;
}

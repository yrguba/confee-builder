import firebase from 'firebase/compat';
import { useEffect, useState } from 'react';

import { axiosClient } from '../configs';

function useFetchMediaContent(url: string) {
    const [src, setSrc] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const isFetch = url.split('/')[1] === 'api';

    useEffect(() => {
        if (isFetch) {
            setIsLoading(true);
            axiosClient
                .get(url, { responseType: 'blob' })
                .then(getBase64)
                .then((res: any) => {
                    setSrc(res);
                    error && setError(false);
                })
                .catch(() => setError(true))
                .finally(() => setIsLoading(false));
        } else {
            setSrc(url);
        }
    }, []);

    return {
        src,
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

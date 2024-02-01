import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useState } from 'react';

import { axiosClient } from 'shared/configs';
import { useStorage } from 'shared/hooks';

class AppApi {
    storage = useStorage();

    handleLazyGetFile(url: string, type: 'arraybuffer' | 'blob'): [() => void, UseQueryResult] {
        const [enabled, setEnabled] = useState(false);
        return [
            () => setEnabled(true),
            useQuery(['get-files', url], () => axiosClient.get(url, { responseType: type }), {
                staleTime: Infinity,
                enabled,
                select: (data) => {
                    return data.data;
                },
            }),
        ];
    }
}

export default new AppApi();

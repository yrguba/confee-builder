import { useQuery } from '@tanstack/react-query';

import { axiosClient } from 'shared/configs';
import { useStorage } from 'shared/hooks';

class AppApi {
    storage = useStorage();

    handleGetFile(url: string, isFetch: boolean) {
        return useQuery(['get-files', url], () => axiosClient.get(url, { responseType: 'blob' }), {
            staleTime: Infinity,
            enabled: isFetch,
            select: (data) => {
                return data.data;
            },
        });
    }
}

export default new AppApi();

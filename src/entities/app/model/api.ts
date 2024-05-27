import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { useState } from 'react';

import { axiosClient, axios } from 'shared/configs';
import { useStorage } from 'shared/hooks';

import { httpHandlers } from '../../../shared/lib';
import { Chat } from '../../chat/model/types';

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

    handleGlobalMute() {
        const queryClient = useQueryClient();
        return useMutation((data: { mute: boolean }) => axiosClient.post(`/api/v2/user/mute`, { a: 2 }, { params: { mute: data.mute ? 1 : 0 } }), {
            onSuccess: async (res, data) => {
                queryClient.invalidateQueries(['get-viewer']);
            },
        });
    }
}

export default new AppApi();

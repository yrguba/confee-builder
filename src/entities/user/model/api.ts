import { useQuery, useQueryClient } from '@tanstack/react-query';

import { axiosClient } from 'shared/configs';
import { httpHandlers } from 'shared/lib';

import { User } from './types';

class UserApi {
    pathPrefix = '/api/v2/users';

    handleGetUser(data: { id: string }) {
        const queryClient = useQueryClient();
        const getViewerFn = () => axiosClient.get(`/auth/api/v1/user/${data.id}`);

        return useQuery(['get-private-body', data.id], getViewerFn, {
            enabled: false,
            staleTime: 10000 * 30,
            select: (data) => {
                return httpHandlers.response<User>(data);
            },
        });
    }

    handleCheckNickname() {
        return async (data: { nickname: string }) => {
            const response = await axiosClient.get('/api/v2/users/check-nickname', { params: { nickname: data.nickname } });
            return response.data;
        };
    }

    handleCheckEmail() {
        return async (data: { email: string }) => {
            const response = await axiosClient.get('/api/v2/check-identifier', { params: { identifier: data.email } });
            return response.data;
        };
    }

    handleCheckPhone() {
        return async (data: { phone: string }) => {
            const response = await axiosClient.get('/api/v2/check-identifier', { params: { identifier: data.phone } });
            return response.data;
        };
    }
}

export default new UserApi();

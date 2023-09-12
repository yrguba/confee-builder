import { useQuery } from '@tanstack/react-query';

import { axiosClient } from 'shared/configs';

import { User } from './types';
import { httpHandlers } from '../../../shared/lib';
import { messageTypes } from '../../message';

class UserApi {
    handleGetUserByPhone(data: { phone: string }) {
        return useQuery(['get-user-by-phone', data.phone], () => axiosClient.get(`/api/v2/user/phone`, { params: { phone: data.phone } }), {
            staleTime: Infinity,
            enabled: !!data.phone,
            select: (res) => {
                const updRes = httpHandlers.response<{ data: User[] }>(res);
                return updRes.data?.data;
            },
        });
    }

    handleGetAvatars(data: { userId: number | undefined }) {
        return useQuery(['get-user-avatars', data.userId], () => axiosClient.get(`/api/v2/users/${data.userId}/avatars`), {
            staleTime: Infinity,
            enabled: !!data.userId,
            select: (res) => {
                const updRes = httpHandlers.response<{ avatars: string[] }>(res);
                return updRes.data?.avatars;
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
        return async (data: { phone: string | number }) => {
            const response = await axiosClient.get('/api/v2/check-identifier', { params: { identifier: data.phone } });
            return response.data;
        };
    }
}

export default new UserApi();

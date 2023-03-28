import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useTransition } from 'react';

import { $axios } from 'shared/configs';
import { handlers } from 'shared/lib';

import { User } from './types';

class UserApi {
    pathPrefix = '/api/v2/users';

    handleGetUser(data: { id: string }) {
        const queryClient = useQueryClient();
        const getViewerFn = () => $axios.get(`/auth/api/v1/user/${data.id}`);

        return useQuery(['get-private-chat-info', data.id], getViewerFn, {
            enabled: false,
            staleTime: 10000 * 30,
            select: (data) => {
                return handlers.response<User>(data);
            },
        });
    }
    //
    // handleGetUsers() {
    //     const getViewerFn = () => $axios.get('/auth/api/v1/users');
    //     return useQuery(['get-users'], getViewerFn, {
    //         staleTime: 10000 * 30,
    //         select: (data) => {
    //             return handlers.response<User[]>(data);
    //         },
    //     });
    // }

    handleGetUsers() {
        const getViewerFn = () => $axios.get(`${this.pathPrefix}`);
        return useQuery(['get-users'], getViewerFn, {
            staleTime: 10000 * 30,
            select: (data) => {
                return handlers.response<{ data: User[] }>(data);
            },
        });
    }

    handleGetDepartments() {
        const getViewerFn = () => $axios.get('/auth/api/v1/users');
        return useQuery(['get-departments'], getViewerFn, {
            staleTime: 10000 * 30,
            select: (data) => {
                return handlers.response<User[]>(data);
            },
        });
    }
}

export default new UserApi();

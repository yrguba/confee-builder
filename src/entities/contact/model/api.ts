import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { date } from 'yup';

import { axiosClient } from 'shared/configs';

import { Contact } from './types';
import { httpHandlers } from '../../../shared/lib';

class ContactApi {
    handleGetContact(data: { contactId: number | undefined }) {
        return useQuery(['get-contact', data.contactId], () => axiosClient.get(`api/v2/contacts/${data.contactId}`), {
            enabled: !!data.contactId,
            staleTime: Infinity,
            select: (res) => {
                const updRes = httpHandlers.response<{ data: Contact }>(res);
                return updRes.data?.data;
            },
        });
    }

    handleGetContacts(data: { type: 'registered' | 'unregistered' }) {
        return useQuery(['get-contacts'], () => axiosClient.get(`api/v2/contacts/${data.type}`), {
            staleTime: Infinity,
            select: (res) => {
                const updRes = httpHandlers.response<{ data: Contact[] }>(res);
                return updRes.data?.data;
            },
        });
    }

    handleCreateContact() {
        const queryClient = useQueryClient();
        return useMutation((data: { first_name: string; last_name: string; phone: string }) => axiosClient.post(`/api/v2/contacts`, { contacts: [data] }), {
            onSuccess: async (res) => {
                queryClient.invalidateQueries(['get-contacts']);
            },
        });
    }

    handleUpdateName() {
        const queryClient = useQueryClient();
        return useMutation(
            (data: { id: number; phone: string; first_name: string; last_name: string }) => axiosClient.post(`/api/v2/contacts/change-name`, data),
            {
                onSuccess: async (res) => {
                    queryClient.invalidateQueries(['get-contacts']);
                    queryClient.invalidateQueries(['get-contact']);
                },
            }
        );
    }

    handleDeleteContact() {
        const queryClient = useQueryClient();
        return useMutation((data: { contactId: number }) => axiosClient.delete(`/api/v2/contacts`, { data: { contact_ids: [data.contactId] } }), {
            onSuccess: async (res) => {
                queryClient.invalidateQueries(['get-contacts']);
            },
        });
    }

    handleMuteContact() {
        const queryClient = useQueryClient();
        return useMutation(
            (data: { contactId: number; mute: boolean }) =>
                axiosClient.post(
                    `/api/v2/contacts/${data.contactId}/mute`,
                    { data: { contact_ids: [data.contactId] } },
                    { params: { mute: data.mute ? 1 : 0 } }
                ),
            {
                onSuccess: async (res, variables) => {
                    queryClient.invalidateQueries(['get-contact', variables.contactId]);
                },
            }
        );
    }
}

export default new ContactApi();

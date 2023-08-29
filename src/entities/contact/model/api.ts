import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
        return useMutation((data: { first_name: string; phone: string }) => axiosClient.post(`/api/v2/contacts`, { contacts: [data] }), {
            onSuccess: async (res) => {
                queryClient.invalidateQueries(['get-contacts']);
            },
        });
    }

    handleDeleteContact() {
        const queryClient = useQueryClient();
        // @ts-ignore
        return useMutation((data: { contactId: number }) => axiosClient.delete(`/api/v2/contacts`, { contact_ids: [data.contactId] }), {
            onSuccess: async (res) => {
                queryClient.invalidateQueries(['get-contacts']);
            },
        });
    }
}

export default new ContactApi();

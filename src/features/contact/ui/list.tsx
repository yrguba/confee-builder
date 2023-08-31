import React, { useCallback, useTransition } from 'react';
import { useUpdateEffect } from 'react-use';

import { chatApi } from 'entities/chat';
import { companyTypes } from 'entities/company';
import { contactApi, contactProxy, ContactsListView, contactTypes, useTabsAndLists } from 'entities/contact';
import { viewerApi, viewerTypes } from 'entities/viewer';
import { useArray, useEasyState, useRouter } from 'shared/hooks';
import { Notification, TabBarTypes } from 'shared/ui';

import { Employee, EmployeeProxy } from '../../../entities/company/model/types';
import { ContactProxy } from '../../../entities/contact/model/types';
import { messageService } from '../../../entities/message';
import { createMemo } from '../../../shared/hooks';

function ContactsList() {
    const { navigate, params, pathname } = useRouter();

    const [isPending, startTransition] = useTransition();

    const redirect = useEasyState(false);

    const { data: contactsData } = contactApi.handleGetContacts({ type: 'registered' });
    const { mutate: handleDeleteContact } = contactApi.handleDeleteContact();

    const { data: viewerData } = viewerApi.handleGetViewer();

    const { data: chatData } = chatApi.handleGetPrivateChat({ userId: Number(params.user_id) });
    const { mutate: handleCreateChat } = chatApi.handleCreateChat();

    const notification = Notification.use();

    const clickContact = (contact: ContactProxy) => {
        navigate(`contact/${contact.id}/user/${contact.user_id}`);
    };
    const clickEmployee = (employee: EmployeeProxy) => {
        console.log(employee);
        // navigate(`contact/${contactId}/user/${userId}`);
    };
    const actions = (data?: { action: contactTypes.Actions; contact: contactTypes.ContactProxy | null }) => {
        // navigate(`contact/${data?.contact.id}/user/${data?.contact.user_id}`);
        switch (data?.action) {
            case 'delete':
                return data.contact && handleDeleteContact({ contactId: data.contact.id });
            case 'mute':
                return notification.inDev();
            case 'message':
                // return redirect.set(true);
                return;
            case 'audioCall':
                return notification.inDev();
        }
    };

    const tabsAndLists = useTabsAndLists({ companies: viewerData?.companies, contacts: contactsData });

    useUpdateEffect(() => {
        if (redirect.value) {
            if (chatData) {
                return startTransition(() => navigate(`/chats/chat/${chatData?.id}`));
            }
            params.user_id &&
                handleCreateChat(
                    { user_ids: [params.user_id], is_group: false },
                    {
                        onSuccess: (res) => {
                            startTransition(() => navigate(`/chats/chat/${res?.data.data.id}`));
                        },
                    }
                );
        }
    }, [redirect.value, chatData]);

    return (
        <ContactsListView
            actions={actions}
            clickContact={clickContact}
            clickEmployee={clickEmployee}
            activeUserId={Number(params.contact_id) || null}
            tabsAndLists={tabsAndLists}
        />
    );
}

export default ContactsList;

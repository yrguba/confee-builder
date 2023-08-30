import React, { useTransition } from 'react';
import { useUpdateEffect } from 'react-use';

import { chatApi } from 'entities/chat';
import { contactApi, contactProxy, ContactsListView, contactTypes } from 'entities/contact';
import { viewerApi } from 'entities/viewer';
import { useArray, useEasyState, useRouter } from 'shared/hooks';
import { Notification, TabBarTypes } from 'shared/ui';

function ContactsList() {
    const { navigate, params } = useRouter();

    const [isPending, startTransition] = useTransition();

    const redirect = useEasyState(false);

    const { data: contactsData } = contactApi.handleGetContacts({ type: 'registered' });
    const { mutate: handleDeleteContact } = contactApi.handleDeleteContact();

    const { data: viewerData } = viewerApi.handleGetViewer();

    const { data: chatData } = chatApi.handleGetPrivateChat({ userId: Number(params.user_id) });
    const { mutate: handleCreateChat } = chatApi.handleCreateChat();

    const notification = Notification.use();

    const clickOnUser = (contact: contactTypes.ContactProxy) => {
        navigate(`contact/${contact.id}/user/${contact.user_id}`);
    };

    const actions = (data?: { action: contactTypes.Actions; contact: contactTypes.ContactProxy }) => {
        navigate(`contact/${data?.contact.id}/user/${data?.contact.user_id}`);
        switch (data?.action) {
            case 'delete':
                return handleDeleteContact({ contactId: data.contact.id });
            case 'mute':
                return notification.inDev();
            case 'message':
                return redirect.set(true);
            case 'audioCall':
                return notification.inDev();
        }
    };

    const tabs = useArray<TabBarTypes.TabBarItem>({ initialArr: [{ id: 0, title: 'Личные', callback: () => '' }] });

    useUpdateEffect(() => {
        if (viewerData?.data?.data.companies.length) {
            const companies: TabBarTypes.TabBarItem[] = [];
            viewerData?.data?.data.companies.forEach((i, index) => {
                companies.push({ id: index + 1, title: i.name || '', callback: () => '' });
            });
            tabs.concat(companies);
        }
    }, [viewerData]);

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
            contacts={contactsData?.map((i) => contactProxy(i))}
            clickOnUser={clickOnUser}
            activeUserId={Number(params.contact_id) || null}
            tabs={tabs}
        />
    );
}

export default ContactsList;

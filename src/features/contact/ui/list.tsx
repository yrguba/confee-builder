import React, { useTransition } from 'react';
import { useUpdateEffect } from 'react-use';

import { chatApi } from 'entities/chat';
import { companyTypes, companyApi } from 'entities/company';
import { contactApi, ContactsListView, contactTypes, useContactsTabsAndLists } from 'entities/contact';
import { ContactProxy } from 'entities/contact/model/types';
import { viewerApi } from 'entities/viewer';
import { useEasyState, useRouter } from 'shared/hooks';
import { Notification, Input } from 'shared/ui';

import { EmployeeProxy } from '../../../entities/company/model/types';

function ContactsList() {
    const { navigate, params, pathname } = useRouter();

    const [isPending, startTransition] = useTransition();

    const redirect = useEasyState(false);

    const searchInput = Input.use({});

    const { data: searchData } = companyApi.handleSearchEmployeesAndContacts({ name: searchInput.value });

    const { data: contactsData } = contactApi.handleGetContacts({ type: 'registered' });
    const { mutate: handleDeleteContact } = contactApi.handleDeleteContact();

    const { data: viewerData } = viewerApi.handleGetViewer();

    const { data: chatData } = chatApi.handleGetPrivateChat({ userId: Number(params.user_id) });
    const { mutate: handleCreatePersonalChat } = chatApi.handleCreatePersonalChat();

    const notification = Notification.use();

    const clickContact = (contact: ContactProxy) => {
        navigate(`contact/${contact.id}/user/${contact.user_id}`);
    };

    const clickEmployee = (employee: companyTypes.Employee) => {
        navigate(`company/${employee.companies[0].id}/department/${employee.departments[0].id}/employee/${employee.id}`);
    };

    const actions = (data?: { action: contactTypes.Actions; contact: contactTypes.ContactProxy | null; employee: EmployeeProxy | null }) => {
        if (data?.contact) clickContact(data.contact);
        if (data?.employee) clickEmployee(data.employee);
        switch (data?.action) {
            case 'delete':
                return data.contact && handleDeleteContact({ contactId: data.contact.id });
            case 'mute':
                return notification.inDev();
            case 'message':
                return redirect.set(true);
            case 'audioCall':
                return notification.inDev();
        }
    };

    const tabsAndLists = useContactsTabsAndLists({ companies: viewerData?.companies, contacts: contactsData });

    useUpdateEffect(() => {
        if (redirect.value) {
            if (chatData) {
                return startTransition(() => navigate(`/chats/chat/${chatData?.id}`));
            }
            params.user_id &&
                handleCreatePersonalChat(
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
            activeUserId={Number(params.contact_id) || Number(params.employee_id) || null}
            tabsAndLists={tabsAndLists}
            searchInput={searchInput}
            foundContacts={searchInput.value ? searchData?.contacts : null}
            foundEmployees={searchInput.value ? searchData?.employees : null}
        />
    );
}

export default ContactsList;

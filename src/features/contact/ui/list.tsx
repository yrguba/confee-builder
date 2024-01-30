import React, { useCallback, useTransition } from 'react';
import { useUpdateEffect } from 'react-use';

import { chatApi } from 'entities/chat';
import { companyTypes, companyApi } from 'entities/company';
import { contactApi, ContactsListView, contactTypes, useContactsTabsAndLists } from 'entities/contact';
import { ContactProxy } from 'entities/contact/model/types';
import { viewerApi } from 'entities/viewer';
import { useEasyState, useRouter } from 'shared/hooks';
import { Notification, Input } from 'shared/ui';

import logo from '../../../shared/ui/icons/ui/logo';

function ContactsList() {
    const { navigate, params, pathname } = useRouter();

    const [isPending, startTransition] = useTransition();

    const contact = useEasyState<contactTypes.ContactProxy | null>(null);
    const employee = useEasyState<companyTypes.EmployeeProxy | null>(null);

    const userId = Number(params.user_id) || contact.value?.user.id;

    const { mutate: handleDeleteContact } = contactApi.handleDeleteContact();
    const { data: viewerData } = viewerApi.handleGetViewer();

    const tabsAndLists = useContactsTabsAndLists({ companies: viewerData?.data.data.companies });

    const { data: chatData } = chatApi.handleGetChatWithUser({ userId });
    const { mutate: handleCreatePersonalChat } = chatApi.handleCreatePersonalChat();
    const { mutate: handleCreateCompanyChat } = chatApi.handleCreateCompanyChat();

    const notification = Notification.use();

    const clickContact = useCallback((contact: ContactProxy) => {
        navigate(`/contacts/personal/contact/${contact.id}/user/${contact.user.id}`);
    }, []);

    const clickEmployee = (employee: companyTypes.Employee) => {
        navigate(`/contacts/companies/${tabsAndLists.activeTab?.payload?.id}/department/${employee.departments[0].id}/employee/${employee.id}`);
    };

    const createMessage = (contact: contactTypes.ContactProxy | null, employee: companyTypes.EmployeeProxy | null) => {
        const chatType = contact ? 'personal' : 'company';
        if (chatData) {
            return startTransition(() => navigate(`/chats/${chatType}/chat/${chatData?.id}`));
        }
        if (contact) {
            return handleCreatePersonalChat(
                { user_ids: [contact.user.id], is_group: false },
                {
                    onSuccess: (res) => {
                        startTransition(() => navigate(`/chats/personal/chat/${res?.data.data.id}`));
                    },
                }
            );
        }
        if (employee) {
            return handleCreateCompanyChat(
                { body: { employee_ids: [employee.id], is_group: false }, companyId: tabsAndLists.activeTab?.payload?.id },
                {
                    onSuccess: (res) => {
                        startTransition(() => navigate(`/chats/company/${tabsAndLists.activeTab?.payload?.id}/chat/${res?.data.data.id}`));
                    },
                }
            );
        }
    };

    const actions = (data?: { action: contactTypes.Actions; contact: contactTypes.ContactProxy | null; employee: companyTypes.EmployeeProxy | null }) => {
        if (data?.contact) contact.set(data.contact);
        if (data?.employee) employee.set(data.employee);
        switch (data?.action) {
            case 'delete':
                return data.contact && handleDeleteContact({ contactId: data.contact.id });
            case 'mute':
                return notification.inDev();
            case 'message':
                return createMessage(data.contact, data.employee);
            case 'goMeet':
                return notification.inDev();
        }
    };

    return (
        <ContactsListView
            actions={actions}
            clickContact={clickContact}
            clickEmployee={clickEmployee}
            activeUserId={Number(params.contact_id) || Number(params.employee_id) || null}
            tabsAndLists={tabsAndLists}
        />
    );
}

export default ContactsList;

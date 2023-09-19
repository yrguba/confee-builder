import React from 'react';

import { contactApi, ContactProfileView, contactProxy } from 'entities/contact';
import { useRouter } from 'shared/hooks';

import { chatApi } from '../../../entities/chat';
import { Notification } from '../../../shared/ui';

function ContactProfile() {
    const { params, navigate } = useRouter();

    const notifications = Notification.use();

    const { data: contactData } = contactApi.handleGetContact({ contactId: Number(params.contact_id) });
    const { data: chatData } = chatApi.handleGetPrivateChat({ userId: contactData?.user_id });

    const { mutate: handleUpdateName } = contactApi.handleUpdateName();
    const { mutate: handleDeleteContact } = contactApi.handleDeleteContact();
    const { mutate: handleCreatePersonalChat } = chatApi.handleCreatePersonalChat();

    const getChat = () => {
        if (chatData) {
            navigate(`/chats/personal/chat/${chatData?.id}`);
        } else if (contactData?.user_id) {
            handleCreatePersonalChat(
                { user_ids: [contactData?.user_id], is_group: false },
                {
                    onSuccess: (res) => {
                        navigate(`/chats/personal/chat/${res?.data.data.id}`);
                    },
                }
            );
        }
    };

    const deleteContact = () => {
        handleDeleteContact({ contactId: Number(params.contact_id) }, { onSuccess: () => navigate('/contacts/personal') });
    };

    return (
        <ContactProfileView
            actions={{
                getChat,
                delete: deleteContact,
                audioCall: notifications.inDev,
                videoCall: notifications.inDev,
                mute: notifications.inDev,
            }}
            back={() => navigate('/contacts')}
            contact={contactProxy(contactData)}
        />
    );
}

export default ContactProfile;

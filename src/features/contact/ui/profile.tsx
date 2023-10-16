import React from 'react';

import { contactApi, ContactProfileView, contactProxy } from 'entities/contact';
import { useRouter } from 'shared/hooks';

import { chatApi } from '../../../entities/chat';
import { Notification } from '../../../shared/ui';

function ContactProfile() {
    const { params, navigate } = useRouter();

    const notifications = Notification.use();

    const { data: contactData, isLoading } = contactApi.handleGetContact({ contactId: Number(params.contact_id) });
    const { data: chatData } = chatApi.handleGetChatWithUser({ userId: contactData?.user.id });

    const { mutate: handleDeleteContact } = contactApi.handleDeleteContact();
    const { mutate: handleUpdateName } = contactApi.handleUpdateName();
    const { mutate: handleCreatePersonalChat } = chatApi.handleCreatePersonalChat();

    const getChat = () => {
        if (chatData) {
            navigate(`/chats/personal/chat/${chatData?.id}`);
        } else if (contactData?.user.id) {
            handleCreatePersonalChat(
                { user_ids: [contactData?.user.id], is_group: false },
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

    const updName = (name: string) => {};

    const clickAvatar = () => {};

    return (
        <ContactProfileView
            actions={{
                getChat,
                delete: deleteContact,
                audioCall: notifications.inDev,
                videoCall: notifications.inDev,
                mute: notifications.inDev,
            }}
            updName={updName}
            clickAvatar={clickAvatar}
            back={() => navigate('/contacts')}
            contact={contactProxy(contactData)}
            loading={isLoading}
        />
    );
}

export default ContactProfile;

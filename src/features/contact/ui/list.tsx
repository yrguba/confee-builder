import React from 'react';

import { ContactApi, contactProxy, ContactsListView } from 'entities/contact';
import { useRouter } from 'shared/hooks';

function ContactsList() {
    const { navigate, params } = useRouter();

    const { data: contactsData } = ContactApi.handleGetContacts({ type: 'registered' });

    const clickOnUser = (user: any) => {
        console.log(user);
    };
    console.log(contactsData);
    return (
        <>
            <ContactsListView contacts={contactsData?.map((i) => contactProxy(i))} clickOnUser={clickOnUser} activeUserId={Number(params.chat_id) || null} />
        </>
    );
}

export default ContactsList;

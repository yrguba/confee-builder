import React from 'react';

import { contactApi, contactProxy, ContactsListView, contactTypes } from 'entities/contact';
import { useRouter } from 'shared/hooks';

function ContactsList() {
    const { navigate, params } = useRouter();

    const { data: contactsData } = contactApi.handleGetContacts({ type: 'registered' });

    const clickOnUser = (contact: contactTypes.ContactProxy) => {
        navigate(`contact/${contact.id}`);
    };

    const actions = (action: contactTypes.Actions) => {
        console.log(action);
    };

    return (
        <ContactsListView
            actions={actions}
            contacts={contactsData?.map((i) => contactProxy(i))}
            clickOnUser={clickOnUser}
            activeUserId={Number(params.contact_id) || null}
        />
    );
}

export default ContactsList;

import React from 'react';

import { contactApi, ContactProfileView, contactProxy } from 'entities/contact';
import { useRouter } from 'shared/hooks';

function ContactProfile() {
    const { params } = useRouter();

    const { data: contactData } = contactApi.handleGetContact({ contactId: Number(params.contact_id) });

    return <ContactProfileView contact={contactProxy(contactData)} />;
}

export default ContactProfile;

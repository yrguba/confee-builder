import React from 'react';

import { contactApi, ContactProfileView, contactProxy } from 'entities/contact';
import { useRouter } from 'shared/hooks';

function ContactProfile() {
    const { params, navigate } = useRouter();

    const { data: contactData } = contactApi.handleGetContact({ contactId: Number(params.contact_id) });
    const { mutate: handleUpdateName } = contactApi.handleUpdateName();

    const updateName = (name: string | number | undefined) => {
        contactData?.phone && name && handleUpdateName({ phone: contactData?.phone, name: String(name) });
    };

    return <ContactProfileView updateName={updateName} back={() => navigate('/contacts')} contact={contactProxy(contactData)} />;
}

export default ContactProfile;

import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import { Profile } from './widgets';

const ContactsPage = lazy(() => import('./ui'));

const contactsPageRouters = (
    <Route path="/contacts" element={<ContactsPage />}>
        <Route path="contact/:contact_id/user/:user_id" element={<Profile />} />
    </Route>
);

export default contactsPageRouters;

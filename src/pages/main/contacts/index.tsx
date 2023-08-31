import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import { ContactProfile, EmployeeProfile } from './widgets';

const ContactsPage = lazy(() => import('./ui'));

const contactsPageRouters = (
    <Route path="/contacts" element={<ContactsPage />}>
        <Route path="contact/:contact_id/user/:user_id" element={<ContactProfile />} />
        <Route path="company/employee/:employee_id" element={<EmployeeProfile />} />
    </Route>
);

export default contactsPageRouters;

import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import { ContactProfile, EmployeeProfile } from './widgets';

const ContactsPage = lazy(() => import('./ui'));

const contactsPageRouters = ['/contacts', '/contacts/companies'].map((path) => (
    <Route key={path} path={path} element={<ContactsPage />}>
        <Route path="contact/:contact_id/user/:user_id" element={<ContactProfile />} />
        <Route path="company/:company_id/department/:department_id/employee/:employee_id" element={<EmployeeProfile />} />
    </Route>
));

export default contactsPageRouters;

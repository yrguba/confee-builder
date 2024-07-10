import React, { lazy, Fragment } from 'react';
import { Navigate, Route } from 'react-router-dom';

import { ContactProfile, EmployeeProfile } from './widgets';

const ContactsPage = lazy(() => import('./ui'));

const contactsPageRouters = ['/contacts/personal', '/contacts/company/:company_id'].map((path) => (
    <Fragment key={path}>
        <Route path={path} element={<ContactsPage />}>
            <Route path="contact/:contact_id/user/:user_id" element={<ContactProfile />} />
            <Route path="department/:department_id/employee/:employee_id" element={<EmployeeProfile />} />
        </Route>
        <Route path="/contacts" element={<Navigate to="/contacts/personal" replace />} />
    </Fragment>
));

export default contactsPageRouters;

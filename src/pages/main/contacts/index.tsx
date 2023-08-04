import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const ContactsPage = lazy(() => import('./ui'));

const contactsPageRouters = <Route path="/contacts" element={<ContactsPage />} />;

export default contactsPageRouters;

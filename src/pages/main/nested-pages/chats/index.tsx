import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import { routing_tree } from '../../../../shared/routing';

const ChatsNestedPage = lazy(() => import('./ui'));

const companyRouters = <Route path={routing_tree.main.chats.base} element={<ChatsNestedPage />} />;

export default companyRouters;

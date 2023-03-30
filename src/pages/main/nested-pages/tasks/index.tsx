import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import { routing_tree } from 'shared/routing';

const TasksPage = lazy(() => import('./ui'));

const tasksRouters = <Route path={routing_tree.main.tasks.base} element={<TasksPage />} />;

export default tasksRouters;

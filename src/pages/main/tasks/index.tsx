import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const TasksPage = lazy(() => import('./ui'));

const tasksPageRouters = <Route path="/tasks" element={<TasksPage />} />;

export default tasksPageRouters;

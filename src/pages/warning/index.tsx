import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import ServerWarningPage from './widgets/server';
import SizeWarningPage from './widgets/size';

const WarningPage = lazy(() => import('./ui'));

const warningPageRouters = (
    <Route path="/warning" element={<WarningPage />}>
        <Route path="size" element={<SizeWarningPage />} />
        <Route path="server" element={<ServerWarningPage />} />
    </Route>
);

export default warningPageRouters;

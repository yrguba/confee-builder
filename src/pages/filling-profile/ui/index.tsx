import React from 'react';
import { Outlet } from 'react-router-dom';

import { appObserver } from '../../../entities/app';
import Wrapper from '../../wrapper';

function FillingProfilePage() {
    appObserver();

    return (
        <Wrapper>
            <Outlet />
        </Wrapper>
    );
}

export default FillingProfilePage;

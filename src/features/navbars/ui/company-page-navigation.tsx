import React, { useTransition } from 'react';
import { useParams } from 'react-router';
import { useLocation, useNavigate } from 'react-router-dom';

import { userMethods } from 'entities/user';
import { useRowAndDropdown } from 'shared/hooks';
import { routing_tree } from 'shared/routing';
import { Button, Navbar, Breadcrumb } from 'shared/ui';

function CompanyPageNavigation() {
    const navigate = useNavigate();
    const params = useParams();
    const { pathname } = useLocation();
    const user = userMethods.getUserById(params.user_id);
    console.log(user);
    const items = [{ id: 0 }];

    return <Breadcrumb items={items} onClick={() => console.log()} />;
}

export default CompanyPageNavigation;

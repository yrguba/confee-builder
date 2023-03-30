import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useLocation, useNavigate } from 'react-router-dom';

import { routing_tree } from 'shared/routing';
import { Breadcrumb, BreadcrumbTypes } from 'shared/ui';

function DepartmentPageNavigation() {
    const navigate = useNavigate();
    const params = useParams();
    const { pathname } = useLocation();

    const pathList = { ...params };
    delete pathList.user_id;
    const items: any = Object.keys(pathList).map((i) => {
        if (i.includes('department')) {
            return { id: 1, path: 'department', name: params[i] };
        }
        if (i.includes('division')) {
            return { id: 2, path: 'division', name: params[i] };
        }
        if (i.includes('user_name')) {
            return { id: 3, path: `user_id/${params.user_id}/user_name/${params.user_name}`, name: params.user_name };
        }
    });

    const getLastPath = () => {
        const lastPath = pathname.split('/').pop();
        const endpnt: Record<string, string> = {
            messages: 'сообщения',
            favorites: 'избранное',
            tasks: 'задачи',
            info: 'информация',
        };
        if (lastPath && Object.keys(endpnt).includes(lastPath)) {
            return { id: 4, path: routing_tree.main.company.path, name: endpnt[lastPath] };
        }
        return { id: 4, path: routing_tree.main.company.path, name: '' };
    };

    const itemClick = (item: BreadcrumbTypes.BreadcrumbItem) => {
        const basePath = '/main/company';
        if (item.path.includes('department')) {
            navigate(`${basePath}/department/${item.name}`);
        }
        if (item.path.includes('division')) {
            navigate(`${basePath}/department/${params.department_name}/division/${item.name}`);
        }
    };

    return (
        <Breadcrumb items={[{ id: 0, path: routing_tree.main.company.base, name: 'Компания' }, ...items, getLastPath()]} onClick={(item) => itemClick(item)} />
    );
}

export default DepartmentPageNavigation;

import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useLocation, useNavigate } from 'react-router-dom';

import { routing_tree } from 'shared/routing';
import { Breadcrumb, BreadcrumbTypes } from 'shared/ui';

function CompanyPageNavigation() {
    const navigate = useNavigate();
    const params = useParams();
    const { pathname } = useLocation();

    const items: any = Object.keys(params).map((i) => {
        if (i.includes('department')) {
            return { id: 1, path: 'department', name: params[i] };
        }
        if (i.includes('division')) {
            return { id: 3, path: 'division', name: params[i] };
        }
        if (i.includes('user')) {
            return { id: 4, path: `user/${params[i]}`, name: params[i] };
        }
    });

    useEffect(() => {
        const lastPath = pathname.split('/').pop();

        const enpnt = ['messages', 'favorites', 'tasks', 'info'];
        if (lastPath && enpnt.includes(lastPath)) {
            items.push({ id: 5, path: routing_tree.main.company.base, name: lastPath });
        }
    }, [pathname]);

    const itemClick = (item: BreadcrumbTypes.BreadcrumbItem) => {
        const basePath = '/main/company';
        if (item.path.includes('department')) {
            navigate(`${basePath}/department/${item.name}`);
        }
        if (item.path.includes('division')) {
            navigate(`${basePath}/department/${params.department_name}/division/${item.name}`);
        }
        if (item.path.includes('user')) {
            navigate(`${basePath}/department/${params.departament_name}/division/${params.division_name}/user/${item.name}/info`);
        }
    };

    return <Breadcrumb items={[{ id: 0, path: routing_tree.main.company.base, name: 'Компания' }, ...items]} onClick={(item) => itemClick(item)} />;
}

export default CompanyPageNavigation;

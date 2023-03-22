import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useLocation, useNavigate } from 'react-router-dom';

import { routing_tree } from 'shared/routing';
import { Breadcrumb, BreadcrumbTypes } from 'shared/ui';

import { useSelected } from '../../../shared/hooks';

function CompanyPageNavigation() {
    const navigate = useNavigate();
    const params = useParams();
    const { pathname } = useLocation();

    const [items, setItems] = useSelected({ multiple: true, deleteElement: false });

    useEffect(() => {
        Object.keys(params).forEach((i) => {
            if (i.includes('department')) {
                setItems({ id: 1, path: 'department', name: params[i] });
            }
            if (i.includes('division')) {
                setItems({ id: 2, path: 'division', name: params[i] });
            }
            if (i.includes('user_name')) {
                setItems({ id: 3, path: `user_id/${params.user_id}/user_name/${params.user_name}`, name: params.user_name });
            }
        });
    }, [pathname]);

    useEffect(() => {
        const lastPath = pathname.split('/').pop();
        const endpnt = ['messages', 'favorites', 'tasks', 'info'];
        if (lastPath && endpnt.includes(lastPath)) {
            // items.push({ id: 4, path: routing_tree.main.company.base, name: lastPath });
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
            // navigate(`${basePath}/department/${params.departament_name}/division/${params.division_name}/user_id/${item.id}/user_name/${item.name}/info`);
        }
    };
    console.log(items);
    return <Breadcrumb items={[{ id: 0, path: routing_tree.main.company.base, name: 'Компания' }, ...items]} onClick={(item) => itemClick(item)} />;
}

export default CompanyPageNavigation;

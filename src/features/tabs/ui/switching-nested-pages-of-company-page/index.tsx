import React, { useTransition } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { routing_tree } from 'shared/routing';
import { Button } from 'shared/ui';

import styles from './styles.module.scss';
import { tabsTypes } from '../../index';

type Routing = keyof typeof routing_tree.main.company;
type Tab = tabsTypes.Tab<Routing>;

function SwitchingNestedPagesOfCompanyPage() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const suffixPath = pathname.split('/').pop();

    const [isPending, startTransition] = useTransition();

    const tabs: Tab[] = [
        { id: 0, text: 'Сообщения ', path: 'messages' },
        { id: 1, text: 'Избранное', path: 'favorites' },
        { id: 2, text: 'Задачи', path: 'tasks' },
        { id: 3, text: 'Информация', path: 'info' },
    ];

    const buttonClick = (id: number, path: any) => {
        startTransition(() => navigate(path));
    };

    return (
        <div className={styles.tabs}>
            {tabs.map((btn) => (
                <Button
                    active={suffixPath === btn.path}
                    disabled={isPending}
                    loading={isPending && suffixPath === btn.path}
                    key={btn.id}
                    onClick={() => buttonClick(btn.id, btn.path)}
                >
                    {btn.text}
                </Button>
            ))}
        </div>
    );
}

export default SwitchingNestedPagesOfCompanyPage;

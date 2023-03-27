import React, { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ChatsList } from 'features/chat';
import { SearchChats } from 'features/search';
import { Icons } from 'shared/ui';

import styles from './styles.module.scss';
import UserRightSidebarChatsPage from './user';

function RightSidebarChatsPage() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const lastPath = pathname.split('/').pop() || '';

    const dictionary: Record<string, { title: string; component: ReactNode }> = {
        info: {
            title: 'Информация',
            component: <UserRightSidebarChatsPage />,
        },
    };

    const closeSidebar = () => {
        const path = pathname.split('/');
        path.splice(-1);
        navigate(path.join('/'));
    };

    const current = dictionary[lastPath];

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.title}>{current?.title}</div>
                <div onClick={closeSidebar} className={styles.icon}>
                    <Icons variants="exit" />
                </div>
            </div>
            <div className={styles.outlet}>{current?.component}</div>
        </div>
    );
}

export default RightSidebarChatsPage;

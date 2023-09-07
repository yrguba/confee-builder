import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';

import { useDraggableScroll, useRouter } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Box, Title } from 'shared/ui';

import styles from './styles.module.scss';

function ProfilePage() {
    const { navigate, pathname } = useRouter();

    const items: BaseTypes.Item<any, { description: string; path: string; active: string[] }>[] = [
        { id: 0, title: 'Личная информация', payload: { description: 'Изменить персональные данные', path: '', active: ['profile', 'info_settings'] } },
        { id: 1, title: 'Настройки', payload: { description: 'Изменить настройки приложения, выйти', path: 'app_settings', active: ['app_settings'] } },
        { id: 2, title: 'Политика конфиденциальности', payload: { description: 'Узнать подробную информацию', path: 'policy', active: ['policy'] } },
        { id: 3, title: 'Поддержка', payload: { description: 'Задать вопрос, сообщить об ошибке', path: 'support', active: ['support'] } },
    ];

    const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const { events } = useDraggableScroll(ref);

    const itemClick = (path: string) => {
        navigate(path);
    };

    return (
        <Box.Animated transition={{ duration: 0.1 }} presence={false} visible className={styles.wrapper}>
            <div className={styles.tabs} {...events} ref={ref}>
                {items.map((i) => (
                    <div
                        key={i.id}
                        className={`${styles.item} ${i.payload.active.includes(pathname.split('/').pop() || '') ? styles.item_active : ''}`}
                        onClick={() => itemClick(i.payload.path)}
                    >
                        <Title variant="H3M">{i.title}</Title>
                        <Title variant="H4M">{i.payload.description}</Title>
                    </div>
                ))}
            </div>
            <div className={styles.outlet}>
                <Outlet />
            </div>
        </Box.Animated>
    );
}

export default ProfilePage;

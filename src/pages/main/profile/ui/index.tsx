import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';

import { useDraggableScroll, useRouter, useSize } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Box, Icons, Title, IconsTypes } from 'shared/ui';

import styles from './styles.module.scss';

function ProfilePage() {
    const { navigate, pathname } = useRouter();

    const { width } = useSize();

    const m = width < 738;
    const l = width > 1340;

    const items: BaseTypes.Item<IconsTypes.BaseIconsVariants, { description: string; path: string; active: string[] }>[] = [
        {
            id: 0,
            title: 'Личная информация',
            payload: { description: l ? 'Изменить персональные данные' : '', path: '', active: ['profile', 'info_settings'] },
            icon: 'personal-acc',
        },
        {
            id: 1,
            title: 'Настройки',
            payload: { description: l ? 'Изменить настройки приложения, выйти' : '', path: 'app_settings', active: ['app_settings'] },
            icon: 'settings',
        },
        {
            id: 2,
            title: 'Политика конфиденциальности',
            payload: { description: l ? 'Узнать подробную информацию' : '', path: 'policy', active: ['policy'] },
            icon: 'privacy-policy',
        },
        {
            id: 3,
            title: 'Поддержка',
            payload: { description: l ? 'Задать вопрос, сообщить об ошибке' : '', path: 'support', active: ['support'] },
            icon: 'support',
        },
    ];

    const itemClick = (path: string) => {
        navigate(path);
    };

    return (
        <Box.Animated transition={{ duration: 0.1 }} presence={false} visible className={styles.wrapper}>
            <div className={styles.tabs}>
                {items.map((i) => {
                    const active = i.payload.active.includes(pathname.split('/').pop() || '');
                    return (
                        <div key={i.id} className={`${styles.item} ${active ? styles.item_active : ''}`} onClick={() => itemClick(i.payload.path)}>
                            <div className={styles.icon}>
                                <Icons variant={i.icon} />
                            </div>

                            {!m && (
                                <Title variant="caption1M" active={active} primary={false} textWrap>
                                    {i.title}
                                </Title>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className={styles.outlet}>
                <Outlet />
            </div>
        </Box.Animated>
    );
}

export default ProfilePage;

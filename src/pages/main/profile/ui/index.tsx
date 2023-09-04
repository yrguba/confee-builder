import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';

import { useDraggableScroll, useRouter } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Box, Title } from 'shared/ui';

import styles from './styles.module.scss';

function ProfilePage() {
    const { navigate } = useRouter();

    const items: BaseTypes.Item<any, { description: string; path: string }>[] = [
        { id: 0, title: 'Личная информация', payload: { description: 'Изменить персональные данные', path: '' } },
        { id: 0, title: 'Настройки', payload: { description: 'Изменить настройки приложения, выйти', path: 'settings' } },
        { id: 0, title: 'Политика конфиденциальности', payload: { description: 'Узнать подробную информацию', path: 'policy' } },
        { id: 0, title: 'Поддержка', payload: { description: 'Задать вопрос, сообщить об ошибке', path: 'support' } },
    ];

    const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const { events } = useDraggableScroll(ref);

    const itemClick = (path: string) => {
        navigate(path);
    };

    return (
        <Box.Animated visible className={styles.wrapper}>
            <div className={styles.tabs} {...events} ref={ref}>
                {items.map((i) => (
                    <div className={styles.item} onClick={() => itemClick(i.payload.path)}>
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

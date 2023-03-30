import React, { useState } from 'react';

import { useArray, useStyles } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Avatar, Box, Button, Dropdown, Icons } from 'shared/ui';

import styles from './styles.module.scss';
import { ViewerTypes } from '../../../viewer';
import statuses from '../../lib/statuses';
import { User } from '../../model/types';
import UserStatusView from '../status';

type Props = {} & BaseTypes.Statuses;

function UsersFilterView(props: Props) {
    // const { user, onClick, loading, direction, error } = props;

    const { arr, push } = useArray({ selfDestruction: true });

    const items = [
        {
            id: 0,
            title: 'Статусы',
            items: statuses.map((i, index) => ({ id: index, title: i })),
        },
        { id: 1, title: 'Должность', items: [{ id: 0, title: 'awd' }] },
    ];

    const content = (
        <div className={styles.contentWrapper}>
            {items.map((item) => (
                <div className={styles.selector} key={item.id}>
                    <div className={styles.title}>{item.title}</div>
                    <div className={styles.default} onClick={() => push({ id: item.id })}>
                        <div>{statuses[0]}</div>
                        <Icons.ArrowAnimated variants="rotate" initialDeg={90} />
                    </div>
                    <Box.Animated visible={arr[0]?.id === item.id} className={styles.selectors} animationVariant="autoHeight">
                        {item.items.map((i) => (
                            <div className={`${styles.item} ${i.title === 'В офисе' && styles.item__active}`} key={i.id}>
                                {i.title}
                            </div>
                        ))}
                    </Box.Animated>
                </div>
            ))}
        </div>
    );

    return (
        <div className={styles.wrapper}>
            <Dropdown animationVariant="autoHeight" content={content} position="bottom-center">
                <div className={styles.btn}>Фильтр</div>
            </Dropdown>
        </div>
    );
}

export default UsersFilterView;

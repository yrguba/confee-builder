import React from 'react';

import { BaseTypes } from 'shared/types';
import { Box, IconsTypes, Icons, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { InputMenuActions, MessageProxy } from '../../../model/types';

type Props = {
    inputMenuAction: (action: InputMenuActions) => void;
} & BaseTypes.Statuses;

function InputMenu(props: Props) {
    const { inputMenuAction } = props;

    const items: BaseTypes.Item<IconsTypes.BaseIconsVariants, InputMenuActions>[] = [
        { id: 0, title: 'image', icon: 'add', payload: 'select-images' },
        // { id: 1, title: 'Переслать', icon: 'add', payload: 'select-images' },
        // { id: 2, title: 'Скопировать текст', icon: 'add', payload: 'select-images' },
        // { id: 3, title: 'Редактировать', icon: 'add', payload: 'select-images' },
        // { id: 4, title: 'Удалить', icon: 'delete', payload: 'select-images' },
        // { id: 5, title: 'Упомянуть автора', icon: 'add', payload: 'select-images' },
        // { id: 6, title: 'Преобразовать в задачу', icon: 'add', payload: 'select-images' },
    ];

    return (
        <Box className={styles.wrapper}>
            {items.map((i) => (
                <div className={styles.item} key={i.id} onClick={() => inputMenuAction(i.payload)}>
                    <Icons variant={i.icon} />
                    <Title variant="H3M">{i.title}</Title>
                </div>
            ))}
        </Box>
    );
}

export default InputMenu;

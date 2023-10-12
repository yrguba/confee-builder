import React from 'react';

import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { Button, Icons, Input, Title } from '../../../../shared/ui';

type Props = {
    close: () => void;
} & BaseTypes.Statuses;

function SearchMessagesView(props: Props) {
    const { close } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <Button.Circle variant="inherit" radius={28} onClick={close}>
                        <Icons variant="close" />
                    </Button.Circle>
                    <Title variant="H2">Поиск сообщений</Title>
                </div>
                <div className={styles.search}>
                    <Input clearIcon prefixIcon="search" />
                </div>
            </div>

            <div className={styles.messages}>messages</div>
        </div>
    );
}

export default SearchMessagesView;

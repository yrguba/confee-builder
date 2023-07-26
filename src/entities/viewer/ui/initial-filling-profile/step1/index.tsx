import React from 'react';

import { ViewerTypes } from 'entities/viewer';
import { useDebounce, useInput } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Avatar, Box, Button, Input, Title } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    viewer: ViewerTypes.Viewer | BaseTypes.Empty;
    handleSubmit: (arg: string) => void;
    nicknameInput: ReturnType<typeof useInput>;
};

function InitialFillingProfileStep1View(props: Props) {
    const { viewer, nicknameInput, handleSubmit } = props;

    return (
        <Box.Animated visible className={styles.wrapper}>
            <div className={styles.description}>
                <div className={styles.title}>Придумайте никнейм</div>
                <div className={styles.subtitle}>Уникальный идентификатор, по которому вас можно найти</div>
            </div>
            <div className={styles.input}>
                <Input placeholder={viewer?.nickname} {...nicknameInput} prefix="@" clearIcon size="m" width="100%" />
            </div>
            <div className={styles.help}>Можно использовать символы a-z, 0-9 и подчёркивания. Минимальная длина − 5 символов, максимальная − 20.</div>

            <Button disabled={nicknameInput.error} onClick={() => handleSubmit(nicknameInput.value)} size="m" width="100%">
                Далее
            </Button>
        </Box.Animated>
    );
}

export default InitialFillingProfileStep1View;

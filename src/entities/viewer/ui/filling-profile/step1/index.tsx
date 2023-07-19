import React, { InputHTMLAttributes } from 'react';

import { ViewerTypes } from 'entities/viewer';
import { useDebounce, useInput } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Avatar, Button, Input, Title } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    viewer: ViewerTypes.Viewer | BaseTypes.Empty;
    handleSubmit: (arg: string) => void;
    error: string;
    clearError: () => void;
};

function FillingProfileStep1View(props: Props) {
    const { viewer, error, clearError, handleSubmit } = props;

    const nickname = useInput();

    return (
        <div className={styles.wrapper}>
            <div className={styles.description}>
                <div className={styles.title}>Придумайте никнейм</div>
                <div className={styles.subtitle}>Уникальный идентификатор, по которому вас можно найти</div>
            </div>
            <div className={styles.input}>
                <Input onFocus={clearError} debounceDelay={0} errorTitle={error} error={!!error} {...nickname} prefix="@" clearIcon size="xxl" />
            </div>
            <div className={styles.help}>Можно использовать символы a-z, 0-9 и подчёркивания. Минимальная длина − 5 символов, максимальная − 20.</div>

            <Button disabled={!!error} onClick={() => handleSubmit(nickname.value)} size="xl">
                Далее
            </Button>
        </div>
    );
}

export default FillingProfileStep1View;

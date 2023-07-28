import React from 'react';

import { ViewerTypes } from 'entities/viewer';
import { useInput } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Box, Button, Input, Title } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    handleSubmit: () => void;
    back: () => void;
    nicknameInput: ReturnType<typeof useInput>;
};

function ChangeNickNameModalView(props: Props) {
    const { nicknameInput, back, handleSubmit } = props;

    return (
        <Box.Animated visible className={styles.wrapper}>
            <div className={styles.description}>
                <Title variant="H2">Придумайте никнейм</Title>
                <Title primary={false} textWrap variant="H3M">
                    Уникальный идентификатор, по которому вас можно найти
                </Title>
            </div>
            <div className={styles.input}>
                <Input placeholder="nickname" {...nicknameInput} prefix="@" clearIcon size="m" />
                <Title primary={false} textWrap variant="caption1M">
                    Можно использовать символы a-z, 0-9 и подчёркивания. Минимальная длина − 5 символов, максимальная − 20.
                </Title>
            </div>
            <div className={styles.buttons}>
                <Button variant="secondary" onClick={back} size="m" width="50%">
                    Назад
                </Button>
                <Button disabled={nicknameInput.error} onClick={() => handleSubmit()} size="m" width="50%">
                    Сохранить
                </Button>
            </div>
        </Box.Animated>
    );
}

export default ChangeNickNameModalView;

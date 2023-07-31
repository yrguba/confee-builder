import React from 'react';

import { UseInputReturnedTypes } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Box, Button, Input, Title } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    handleSubmit: () => void;
    back: () => void;
    inputs: {
        lastName: UseInputReturnedTypes;
        firstName: UseInputReturnedTypes;
    };
};

function ChangeNameModalView(props: Props) {
    const { inputs, back, handleSubmit } = props;

    return (
        <Box.Animated visible className={styles.wrapper}>
            <div className={styles.description}>
                <Title variant="H2">Введите имя и фамилию</Title>
                <Title primary={false} textWrap variant="H3M">
                    Они будут отображаться другим пользователям приложения
                </Title>
            </div>
            <div className={styles.inputs}>
                <Input placeholder="Имя" {...inputs.firstName} clearIcon size="m" />
                <Input placeholder="Фамилия" {...inputs.lastName} clearIcon size="m" />
            </div>
            <div className={styles.buttons}>
                <Button variant="secondary" onClick={back} size="m" width="50%">
                    Назад
                </Button>
                <Button disabled={inputs.lastName.error || inputs.firstName.error} onClick={() => handleSubmit()} size="m" width="50%">
                    Сохранить
                </Button>
            </div>
        </Box.Animated>
    );
}

export default ChangeNameModalView;

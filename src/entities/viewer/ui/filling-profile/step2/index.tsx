import React from 'react';

import { ViewerTypes } from 'entities/viewer';
import { UseInputReturnedTypes } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Box, Button, Input } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    viewer: ViewerTypes.Viewer | BaseTypes.Empty;
    handleSubmit: () => void;
    inputs: {
        lastName: UseInputReturnedTypes;
        firstName: UseInputReturnedTypes;
    };
};

function FillingProfileStep2View(props: Props) {
    const { viewer, inputs, handleSubmit } = props;

    return (
        <Box.Animated visible className={styles.wrapper}>
            <div className={styles.description}>
                <div className={styles.title}>Введите имя и фамилию</div>
                <div className={styles.subtitle}>Они будут отображаться другим пользователям приложения</div>
            </div>
            <div className={styles.input}>
                <Input placeholder="Имя" {...inputs.firstName} clearIcon size="xxl" />
            </div>
            <div className={styles.inputLastName}>
                <Input placeholder="Фамилия" {...inputs.lastName} clearIcon size="xxl" />
            </div>
            <Button disabled={inputs.lastName.error || inputs.firstName.error} onClick={() => handleSubmit()} size="xl">
                Далее
            </Button>
        </Box.Animated>
    );
}

export default FillingProfileStep2View;

import React from 'react';

import { viewerTypes } from 'entities/viewer';
import { UseInputReturnedTypes } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Box, Button, Input } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    viewer: viewerTypes.Viewer | BaseTypes.Empty;
    handleSubmit: () => void;
    inputs: {
        lastName: UseInputReturnedTypes;
        firstName: UseInputReturnedTypes;
    };
};

function InitialFillingProfileStep2View(props: Props) {
    const { viewer, inputs, handleSubmit } = props;

    return (
        <Box.Animated visible className={styles.wrapper}>
            <div className={styles.description}>
                <div className={styles.title}>Введите имя и фамилию</div>
                <div className={styles.subtitle}>Они будут отображаться другим пользователям приложения</div>
            </div>
            <div className={styles.input}>
                <Input placeholder="Имя" {...inputs.firstName} clearIcon size="m" width="100%" />
            </div>
            <div className={styles.inputLastName}>
                <Input placeholder="Фамилия" {...inputs.lastName} clearIcon size="m" width="100%" />
            </div>
            <Button disabled={inputs.lastName.error || inputs.firstName.error} onClick={() => handleSubmit()} size="m" width="100%">
                Далее
            </Button>
        </Box.Animated>
    );
}

export default InitialFillingProfileStep2View;

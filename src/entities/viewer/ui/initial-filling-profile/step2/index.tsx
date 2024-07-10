import React from 'react';

import { Box, Button, Input, InputTypes } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    handleSubmit: () => void;
    inputs: {
        lastName: InputTypes.UseReturnedType;
        firstName: InputTypes.UseReturnedType;
    };
};

function InitialFillingProfileStep2View(props: Props) {
    const { inputs, handleSubmit } = props;

    return (
        <Box.Animated visible className={styles.wrapper}>
            <div className={styles.description}>
                <div className={styles.title}>Введите имя и фамилию</div>
                <div className={styles.subtitle}>Они будут отображаться другим пользователям приложения</div>
            </div>
            <div className={styles.input}>
                <Input maxLength={20} placeholder="Имя" {...inputs.firstName} clearIcon size="m" width="100%" />
            </div>
            <div className={styles.inputLastName}>
                <Input maxLength={20} placeholder="Фамилия" {...inputs.lastName} clearIcon size="m" width="100%" />
            </div>
            <Button disabled={inputs.lastName.error || inputs.firstName.error} onClick={() => handleSubmit()} size="m" width="100%">
                Далее
            </Button>
        </Box.Animated>
    );
}

export default InitialFillingProfileStep2View;

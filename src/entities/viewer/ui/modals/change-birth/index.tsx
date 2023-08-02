import React from 'react';

import { Box, Button, Input, InputTypes, Title } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    handleSubmit: () => void;
    back: () => void;
    birthInput: InputTypes.UseReturnedType;
};

function ChangeBirthModalView(props: Props) {
    const { back, birthInput, handleSubmit } = props;

    return (
        <Box.Animated visible className={styles.wrapper}>
            <div className={styles.description}>
                <Title variant="H2"> Укажите дату рождения</Title>
            </div>
            <div className={styles.input}>
                <Input placeholder="ДД.ММ.ГГГГ" type="date" {...birthInput} size="m" />
            </div>
            <div className={styles.buttons}>
                <Button variant="secondary" onClick={back} size="m" width="50%">
                    Назад
                </Button>
                <Button disabled={birthInput.error} onClick={() => handleSubmit()} size="m" width="50%">
                    Сохранить
                </Button>
            </div>
        </Box.Animated>
    );
}

export default ChangeBirthModalView;

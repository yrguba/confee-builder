import React from 'react';

import { Box, Button, Input, InputTypes, Avatar } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    handleSubmit: () => void;
    selectFile: () => void;
    getScreenshot: (data: string) => void;
    deleteFile: () => void;
    avatar?: string;
    inputs: {
        email: InputTypes.UseReturnedType;
        birth: InputTypes.UseReturnedType;
    };
};

function InitialFillingProfileStep3View(props: Props) {
    const { inputs, avatar, handleSubmit, selectFile, deleteFile, getScreenshot } = props;

    return (
        <Box.Animated visible className={styles.wrapper}>
            <div className={styles.avatar}>
                <div className={styles.title}>
                    <Avatar.Change img={avatar || ''} deleteFile={deleteFile} selectFile={selectFile} getScreenshot={getScreenshot} />
                </div>
            </div>
            <div className={styles.input}>
                <Input placeholder="Почта" {...inputs.email} clearIcon size="m" />
            </div>
            <div className={styles.inputLastName}>
                <Input type="date" {...inputs.birth} size="m" />
            </div>

            <Button disabled={inputs.email.error} onClick={handleSubmit} size="m">
                Далее
            </Button>
        </Box.Animated>
    );
}

export default InitialFillingProfileStep3View;

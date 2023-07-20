import React from 'react';

import { ViewerTypes } from 'entities/viewer';
import { UseInputReturnedTypes } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { DatePicker, Box, Button, Input } from 'shared/ui';

import styles from './styles.module.scss';
import AvatarEditor from '../../avatar-editor';

type Props = {
    viewer: ViewerTypes.Viewer | BaseTypes.Empty;
    handleSubmit: () => void;
    selectFile: () => void;
    makePhoto: (data: string) => void;
    deleteFile: () => void;
    avatar?: string;
    inputs: {
        email: UseInputReturnedTypes;
        birth: UseInputReturnedTypes;
    };
};

function FillingProfileStep3View(props: Props) {
    const { viewer, inputs, avatar, handleSubmit, selectFile, deleteFile, makePhoto } = props;

    return (
        <Box.Animated visible className={styles.wrapper}>
            <div className={styles.avatar}>
                <div className={styles.title}>
                    <AvatarEditor avatar={avatar} deleteFile={deleteFile} selectFile={selectFile} makePhoto={makePhoto} viewer={viewer} />
                </div>
            </div>
            <div className={styles.input}>
                <Input placeholder="Почта" {...inputs.email} clearIcon size="xxl" />
            </div>
            <div className={styles.inputLastName}>
                <Input type="date" {...inputs.birth} size="xxl" />
            </div>

            <Button disabled={inputs.email.error} onClick={handleSubmit} size="xl">
                Далее
            </Button>
        </Box.Animated>
    );
}

export default FillingProfileStep3View;
